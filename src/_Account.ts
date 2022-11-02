import { AccountSimpleParams, CarrierType, ValidateUtils, VisitorCoreInfo } from './models'
import { makeUUID } from '@fangcha/tools'
import * as bcrypt from 'bcrypt'
import AppError from '@fangcha/app-error'
import { __Account } from './__Account'
import { _AccountCarrier } from './_AccountCarrier'
import { DBProtocolV2, FCDatabase } from 'fc-sql'

export class _Account extends __Account {
  public static AccountCarrier: typeof _AccountCarrier

  public static _onStaticDBOptionsUpdate(protocol: DBProtocolV2) {
    if (protocol) {
      const database = protocol.database as FCDatabase
      class AccountCarrier extends _AccountCarrier {}
      this.AccountCarrier = AccountCarrier
      this.AccountCarrier.setDatabase(database)
    }
  }

  public getClass() {
    return this.constructor as typeof _Account
  }

  public static async findWithAccountUid(accountUid: string) {
    return (await this.findOne({
      account_uid: accountUid,
    }))!
  }

  public static async createAccount(fullParams: AccountSimpleParams) {
    fullParams = ValidateUtils.makePureEmailPasswordParams(fullParams)

    const accountV2 = new this()
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

  public assertPasswordCorrect(password: string) {
    if (!bcrypt.compareSync(password, this.password)) {
      throw new AppError('Password incorrect', 400)
    }
  }

  public async findCarrier(carrierType: CarrierType) {
    return (await this.getClass().AccountCarrier.findOne({
      account_uid: this.accountUid,
      carrier_type: carrierType,
    }))!
  }

  public async getVisitorCoreInfo(): Promise<VisitorCoreInfo> {
    const carrier = await this.findCarrier(CarrierType.Email)
    return {
      accountUid: this.accountUid,
      email: carrier ? carrier.carrierUid : '',
    }
  }
}
