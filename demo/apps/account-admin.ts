import { FangchaApp } from '@fangcha/backend-kit'
import { AccountAdminRouterPlugin } from './admin/AccountAdminRouterPlugin'

const app = new FangchaApp({
  env: 'development',
  appName: 'account-admin',
  plugins: [AccountAdminRouterPlugin],
})
app.launch()
