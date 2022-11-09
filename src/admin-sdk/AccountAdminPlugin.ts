import { RouterApp } from '@fangcha/router'
import { AppPluginProtocol } from '@fangcha/backend-kit/lib/basic'
import { KitProfileSpecDocItem } from '@fangcha/backend-kit/lib/profile'
import { AccountServer } from '../AccountServer'
import { AccountSpecDocItems } from '../admin-specs'
import { RouterSdkPlugin } from '@fangcha/backend-kit/lib/router'

export interface AccountAdminOptions {
  backendPort: number
  baseURL: string
  jwtSecret: string

  accountServer: AccountServer
}

export const AccountAdminPlugin = (options: AccountAdminOptions): AppPluginProtocol => {
  const accountServer = options.accountServer
  const routerApp = new RouterApp({
    useHealthSpecs: true,
    docItems: [KitProfileSpecDocItem, ...AccountSpecDocItems],
  })
  routerApp.addMiddlewareBeforeInit(async (ctx, next) => {
    ctx.accountServer = accountServer
    await next()
  })
  return RouterSdkPlugin({
    baseURL: options.baseURL,
    backendPort: options.backendPort,
    routerApp: routerApp,
    jwtProtocol: {
      jwtKey: 'account_admin_jwt',
      jwtSecret: options.jwtSecret,
    },
  })
}
