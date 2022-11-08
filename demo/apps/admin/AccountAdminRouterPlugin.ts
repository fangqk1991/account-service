import { RouterSdkPlugin } from '@fangcha/router/lib/sdk'
import { AccountSpecs } from './specs/AccountSpecs'
import { DemoConfig } from '../../DemoConfig'
import { RouterApp } from '@fangcha/router'
import { KitProfileSpecDocItem } from '@fangcha/backend-kit/lib/profile'

const routerApp = new RouterApp({
  useHealthSpecs: true,
  docItems: [KitProfileSpecDocItem],
})
routerApp.addDocItem({
  name: 'Account',
  pageURL: '/api-docs/v1/account',
  specs: [...AccountSpecs],
})

export const AccountAdminRouterPlugin = RouterSdkPlugin({
  baseURL: DemoConfig.adminBaseURL,
  backendPort: DemoConfig.adminPort,
  routerApp: routerApp,
  jwtProtocol: {
    jwtKey: 'user_token_jwt',
    jwtSecret: DemoConfig.adminJwtSecret,
  },
})
