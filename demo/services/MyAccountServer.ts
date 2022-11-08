import { MyDatabase } from './MyDatabase'
import { AccountServer } from '../../src'

export const MyAccountServer = new AccountServer({
  database: MyDatabase.accountDB,
})
