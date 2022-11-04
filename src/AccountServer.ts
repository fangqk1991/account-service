import { FCDatabase } from 'fc-sql'
import { AccountErrorPhrase, AccountSimpleParams, CarrierType, ValidateUtils } from './common/models'
import { makeUUID } from '@fangcha/tools'
import * as bcrypt from 'bcrypt'
import { AppException } from '@fangcha/app-error'
import { _Account } from './models/account/_Account'
import { _AccountCarrier } from './models/account/_AccountCarrier'
import { _AccountCarrierExtras } from './models/account/_AccountCarrierExtras'

interface Options {
  database: FCDatabase
  tableName_Account?: string
  tableName_AccountCarrier?: string
  tableName_AccountCarrierExtras?: string
}

export class AccountServer {
  public readonly database: FCDatabase
  public readonly Account!: { new (): _Account } & typeof _Account
  public readonly AccountCarrier!: { new (): _AccountCarrier } & typeof _AccountCarrier
  public readonly AccountCarrierExtras!: { new (): _AccountCarrierExtras } & typeof _AccountCarrierExtras

  constructor(options: Options) {
    this.database = options.database

    class AccountCarrier extends _AccountCarrier {}
    AccountCarrier.addStaticOptions({
      database: options.database,
      table: options.tableName_AccountCarrier || 'fc_account_carrier',
    })
    this.AccountCarrier = AccountCarrier

    class Account extends _Account {}
    Account.addStaticOptions({
      database: options.database,
      table: options.tableName_Account || 'fc_account',
    })
    Account.AccountCarrier = AccountCarrier
    this.Account = Account

    class AccountCarrierExtras extends _AccountCarrierExtras {}
    AccountCarrierExtras.addStaticOptions({
      database: options.database,
      table: options.tableName_AccountCarrierExtras || 'fc_account_carrier_extras',
    })
    this.AccountCarrierExtras = AccountCarrierExtras
  }

  public async findAccount(accountUid: string) {
    return (await this.Account.findOne({
      account_uid: accountUid,
    }))!
  }

  public async findCarrier(carrierType: CarrierType, carrierUid: string) {
    return (await this.AccountCarrier.findOne({
      carrier_type: carrierType,
      carrier_uid: carrierUid,
    }))!
  }

  public async createAccount(fullParams: AccountSimpleParams) {
    fullParams = ValidateUtils.makePureEmailPasswordParams(fullParams)

    const accountV2 = new this.Account()
    accountV2.accountUid = makeUUID()
    accountV2.password = bcrypt.hashSync(fullParams.password || makeUUID(), bcrypt.genSaltSync())
    accountV2.isEnabled = 1
    accountV2.registerIp = ''

    const carrier = new this.AccountCarrier()
    carrier.carrierType = CarrierType.Email
    carrier.carrierUid = fullParams.email || ''
    carrier.accountUid = accountV2.accountUid
    if (await carrier.checkExistsInDB()) {
      throw AppException.exception(AccountErrorPhrase.EmailAlreadyRegistered)
    }

    const runner = await accountV2.dbSpec().database.createTransactionRunner()
    await runner.commit(async (transaction) => {
      await accountV2.addToDB(transaction)
      await carrier.addToDB(transaction)
    })
    return accountV2
  }
}
