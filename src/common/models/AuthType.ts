import { Descriptor } from '@fangcha/tools'

export enum AuthType {
  Simple = 'simple',
  SSO = 'sso',
}

const values = [AuthType.Simple, AuthType.SSO]

const describe = (code: AuthType) => {
  return code
}

export const AuthTypeDescriptor = new Descriptor(values, describe)
