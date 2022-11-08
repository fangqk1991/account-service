import { SpecFactory } from '@fangcha/router'
import assert from '@fangcha/assert'
import { AdminAccountApis } from '../../../../src/common/admin-api'
import { MyAccountServer } from '../../../services/MyAccountServer'
import { AccountErrorPhrase, CarrierType, ValidateUtils } from '../../../../src/common/models'
import { AppException } from '@fangcha/app-error'

const factory = new SpecFactory('Account')

factory.prepare(AdminAccountApis.AccountPageDataGet, async (ctx) => {
  ctx.body = await MyAccountServer.FullAccount.getPageResult(ctx.request.query)
})

factory.prepare(AdminAccountApis.AccountCreate, async (ctx) => {
  const account = await MyAccountServer.createAccount(ctx.request.body)
  ctx.body = account.modelForClient()
})

factory.prepare(AdminAccountApis.AccountPasswordReset, async (ctx) => {
  const accountUid = ctx.params.accountUid
  const account = await MyAccountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  await account.deleteFromDB()
  ctx.status = 200
})

factory.prepare(AdminAccountApis.AccountCarrierUpdate, async (ctx) => {
  const { carrierUid } = ctx.request.body
  if (!ValidateUtils.validateEmail(carrierUid)) {
    throw AppException.exception(AccountErrorPhrase.EmailIncorrect)
  }
  const accountUid = ctx.params.accountUid
  const account = await MyAccountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  const carrier = await account.findCarrier(CarrierType.Email)
  carrier.fc_edit()
  carrier.carrierUid = carrierUid
  await carrier.updateToDB()
  ctx.status = 200
})

factory.prepare(AdminAccountApis.AccountCarrierUnlink, async (ctx) => {
  const accountUid = ctx.params.accountUid
  const account = await MyAccountServer.findAccount(accountUid)
  assert.ok(!!account, `Account[${accountUid}] not exists`)
  const carrier = await account.findCarrier(CarrierType.Email)
  await carrier.deleteFromDB()
  ctx.status = 200
})

export const AccountSpecs = factory.buildSpecs()
