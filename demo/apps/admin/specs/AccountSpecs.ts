import { SpecFactory } from '@fangcha/router'
import assert from '@fangcha/assert'
import { AdminAccountApis } from '../../../../src/common/admin-api'
import { MyAccountServer } from '../../../services/MyAccountServer'

const factory = new SpecFactory('Account')

factory.prepare(AdminAccountApis.AccountPageDataGet, async (ctx) => {
  ctx.body = await MyAccountServer.FullAccount.getPageResult(ctx.request.query)
})

factory.prepare(AdminAccountApis.AccountCreate, async (ctx) => {
  const account = await MyAccountServer.createAccount(ctx.request.body)
  ctx.body = account.modelForClient()
})

factory.prepare(AdminAccountApis.AccountDelete, async (ctx) => {
  const accountUid = ctx.params.accountUid
  const account = await MyAccountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  await account.deleteFromDB()
  ctx.status = 200
})

export const AccountSpecs = factory.buildSpecs()
