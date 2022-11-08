import { FCDatabase } from 'fc-sql'
import { DBOptionsBuilder } from '@fangcha/tools/lib/database'
import { DemoConfig } from '../DemoConfig'

FCDatabase.instanceWithName('accountDB').init(new DBOptionsBuilder(DemoConfig.mysql.accountDB).build())

export const MyDatabase = {
  accountDB: FCDatabase.instanceWithName('accountDB'),
}
