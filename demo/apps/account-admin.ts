import { FangchaApp } from '@fangcha/backend-kit'
import { TypicalSsoSdkPlugin } from '@fangcha/backend-kit/lib/sso'
import { DemoConfig } from '../DemoConfig'
import { AccountAdminPlugin } from '../../src/admin-sdk'
import { MyAccountServer } from '../services/MyAccountServer'
import { WebApp } from '@fangcha/backend-kit/lib/router'

const app = new WebApp({
  env: 'development',
  appName: 'account-admin',
  routerOptions: {
    backendPort: DemoConfig.adminPort,
    baseURL: DemoConfig.adminBaseURL,
    jwtProtocol: {
      jwtKey: 'account_admin_jwt',
      jwtSecret: DemoConfig.adminJwtSecret,
    },
  },
  plugins: [
    TypicalSsoSdkPlugin(DemoConfig.adminSSO),
    AccountAdminPlugin({
      accountServer: MyAccountServer,
    }),
  ],
})
app.launch()
