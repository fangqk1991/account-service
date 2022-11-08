import { FangchaApp } from '@fangcha/backend-kit'
import { TypicalSsoSdkPlugin } from '@fangcha/backend-kit/lib/sso'
import { DemoConfig } from '../DemoConfig'
import { AccountAdminPlugin } from '../../src/admin-sdk'
import { MyAccountServer } from '../services/MyAccountServer'

const app = new FangchaApp({
  env: 'development',
  appName: 'account-admin',
  plugins: [
    TypicalSsoSdkPlugin(DemoConfig.adminSSO),
    AccountAdminPlugin({
      backendPort: DemoConfig.adminPort,
      baseURL: DemoConfig.adminBaseURL,
      jwtSecret: DemoConfig.adminJwtSecret,
      accountServer: MyAccountServer,
    }),
  ],
})
app.launch()
