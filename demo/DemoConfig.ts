import { GlobalAppConfig } from 'fc-config'

export const DemoConfig = GlobalAppConfig as {
  adminPort: number
  adminBaseURL: string
  adminJwtSecret: string
  mysql: {
    accountDB: {
      host: '127.0.0.1'
      port: 3306
      dialect: 'mysql'
      database: 'demo_db'
      username: 'root'
      password: ''
    }
  }
}
