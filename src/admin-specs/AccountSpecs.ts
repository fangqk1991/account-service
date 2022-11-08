import { SpecFactory } from '@fangcha/router'
import assert from '@fangcha/assert'
import { AppException } from '@fangcha/app-error'
import { AdminAccountApis } from '../common/admin-api'
import { AccountErrorPhrase, CarrierType, ValidateUtils } from '../common/models'
import { AccountServer } from '../AccountServer'

const factory = new SpecFactory('Account')

factory.prepare(AdminAccountApis.AccountPageDataGet, async (ctx) => {
  const accountServer = ctx.accountServer as AccountServer
  ctx.body = await accountServer.FullAccount.getPageResult(ctx.request.query)
})

factory.prepare(AdminAccountApis.AccountCreate, async (ctx) => {
  const accountServer = ctx.accountServer as AccountServer
  const account = await accountServer.createAccount(ctx.request.body)
  ctx.body = account.modelForClient()
})

factory.prepare(AdminAccountApis.AccountPasswordReset, async (ctx) => {
  const accountServer = ctx.accountServer as AccountServer
  const accountUid = ctx.params.accountUid
  const account = await accountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  await account.deleteFromDB()
  ctx.status = 200
})

factory.prepare(AdminAccountApis.AccountCarrierUpdate, async (ctx) => {
  const accountServer = ctx.accountServer as AccountServer
  const { carrierUid } = ctx.request.body
  if (!ValidateUtils.validateEmail(carrierUid)) {
    throw AppException.exception(AccountErrorPhrase.EmailIncorrect)
  }
  const accountUid = ctx.params.accountUid
  const account = await accountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  await account.updateCarrier(CarrierType.Email, carrierUid)
  ctx.status = 200
})

factory.prepare(AdminAccountApis.AccountCarrierUnlink, async (ctx) => {
  const accountServer = ctx.accountServer as AccountServer
  const accountUid = ctx.params.accountUid
  const account = await accountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  const carrier = await account.findCarrier(CarrierType.Email)
  await carrier.deleteFromDB()
  ctx.status = 200
})

export const AccountSpecs = factory.buildSpecs()
