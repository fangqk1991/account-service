import { __AccountCarrier } from './__AccountCarrier'
import { CarrierType } from './models'

export class _AccountCarrier extends __AccountCarrier {
  public static async findCarrier(carrierType: CarrierType, carrierUid: string) {
    return (await this.findOne({
      carrier_type: carrierType,
      carrier_uid: carrierUid,
    }))!
  }
}
