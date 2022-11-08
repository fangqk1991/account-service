import { GlobalAppConfig } from 'fc-config'

export const DemoConfig = GlobalAppConfig as {
  adminPort: number
  adminBaseURL: string
  adminJwtSecret: string
  mysql: any
  adminSSO: any
}
