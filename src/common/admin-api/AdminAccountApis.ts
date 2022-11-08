import { Api } from '@fangcha/swagger'

export const AdminAccountApis = {
  AccountPageDataGet: {
    method: 'GET',
    route: '/api/v1/account',
    description: 'Account PageData Get',
  } as Api,
  AccountCreate: {
    method: 'POST',
    route: '/api/v1/account',
    description: 'Account Create',
  } as Api,
  AccountPasswordReset: {
    method: 'PUT',
    route: '/api/v1/account/:accountUid/reset-password',
    description: 'Account Password Reset',
  } as Api,
  AccountDelete: {
    method: 'DELETE',
    route: '/api/v1/account/:accountUid',
    description: 'Account Delete',
  } as Api,
}
