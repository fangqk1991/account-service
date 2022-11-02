import AppError from '@fangcha/app-error'
import { AccountSimpleParams } from './AccountCoreModels'

export class ValidateUtils {
  public static validateEmail(email: string) {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  public static makePureEmailPasswordParams(params: AccountSimpleParams) {
    if (!params.email) {
      throw new AppError('Email incorrect', 400)
    }
    params.email = params.email.trim()
    if (!ValidateUtils.validateEmail(params.email)) {
      throw new AppError('Email incorrect', 400)
    }
    if (!params.password) {
      throw new AppError('Password invalid', 400)
    }
    return params
  }
}
