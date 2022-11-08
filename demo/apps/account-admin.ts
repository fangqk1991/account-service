import { FangchaApp } from '@fangcha/backend-kit'
import { AccountAdminRouterPlugin } from './admin/AccountAdminRouterPlugin'
import { TypicalSsoSdkPlugin } from '@fangcha/backend-kit/lib/sso'
import { DemoConfig } from '../DemoConfig'

const app = new FangchaApp({
  env: 'development',
  appName: 'account-admin',
  plugins: [AccountAdminRouterPlugin, TypicalSsoSdkPlugin(DemoConfig.adminSSO)],
})
app.launch()
