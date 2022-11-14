import { RouterApp } from '@fangcha/router'
import { AppPluginProtocol } from '@fangcha/backend-kit/lib/basic'
import { KitProfileSpecDocItem } from '@fangcha/backend-kit/lib/profile'
import { AccountServer } from '../AccountServer'
import { AccountSpecDocItems } from '../admin-specs'
import { _RouterState } from '@fangcha/backend-kit/lib/router'

export interface AccountAdminOptions {
  accountServer: AccountServer
}

export const AccountAdminPlugin = (options: AccountAdminOptions): AppPluginProtocol => {
  return {
    appWillLoad: () => {
      const accountServer = options.accountServer
      const routerApp = _RouterState.routerApp
      routerApp.addDocItem(...AccountSpecDocItems)
      routerApp.addMiddlewareBeforeInit(async (ctx, next) => {
        ctx.accountServer = accountServer
        await next()
      })
    },
    appDidLoad: () => {},
  }
}
