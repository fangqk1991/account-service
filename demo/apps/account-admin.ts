import { FangchaApp } from '@fangcha/backend-kit'

const app = new FangchaApp({
  env: 'development',
  appName: 'account-admin',
  plugins: [],
})
app.launch()
