import { AccountSpecs } from './AccountSpecs'
import { SwaggerDocItem } from '@fangcha/router'

export const AccountSpecDocItems: SwaggerDocItem[] = [
  {
    name: 'Account',
    pageURL: '/api-docs/v1/account',
    specs: AccountSpecs,
  },
]
