import { __Account } from '../auto-build/__Account'
import * as bcrypt from 'bcrypt'
import AppError from '@fangcha/app-error'
import { CarrierType, VisitorCoreInfo } from '../../common/models'
import { _AccountCarrier } from './_AccountCarrier'

export class _Account extends __Account {
  public static AccountCarrier: typeof _AccountCarrier

  public getClass() {
    return this.constructor as typeof _Account
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
