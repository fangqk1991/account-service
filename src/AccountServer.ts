import { FCDatabase } from 'fc-sql'
import { _Account } from './_Account'
import { _AccountCarrier } from './_AccountCarrier'
import { _AccountCarrierExtras } from './_AccountCarrierExtras'

export class AccountServer {
  public readonly database: FCDatabase
  public readonly Account!: { new (): _Account }
  public readonly AccountCarrier!: { new (): _AccountCarrier }
  public readonly AccountCarrierExtras!: { new (): _AccountCarrierExtras }

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

}
