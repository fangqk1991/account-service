import { FCDatabase } from 'fc-sql'
import { _Account } from './_Account'
import { _AccountCarrier } from './_AccountCarrier'
import { _AccountCarrierExtras } from './_AccountCarrierExtras'
import { AccountSimpleParams, CarrierType, ValidateUtils } from './models'
import { makeUUID } from '@fangcha/tools'
import * as bcrypt from 'bcrypt'
import AppError from '@fangcha/app-error'

export class AccountServer {
  public readonly database: FCDatabase
  public readonly Account!: { new (): _Account } & typeof _Account
  public readonly AccountCarrier!: { new (): _AccountCarrier } & typeof _AccountCarrier
  public readonly AccountCarrierExtras!: { new (): _AccountCarrierExtras } & typeof _AccountCarrierExtras

  constructor(database: FCDatabase) {
    this.database = database

    class Account extends _Account {}
    Account.setDatabase(database)
    this.Account = Account

    class AccountCarrier extends _AccountCarrier {}
    AccountCarrier.setDatabase(database)
    this.AccountCarrier = AccountCarrier

    class AccountCarrierExtras extends _AccountCarrierExtras {}
    AccountCarrierExtras.setDatabase(database)
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
      throw new AppError('Email has been registered', 400)
    }

    const runner = await accountV2.dbSpec().database.createTransactionRunner()
    await runner.commit(async (transaction) => {
      await accountV2.addToDB(transaction)
      await carrier.addToDB(transaction)
    })
    return accountV2
  }
}
