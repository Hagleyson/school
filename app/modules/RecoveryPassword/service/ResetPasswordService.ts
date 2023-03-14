import { validator } from '@ioc:Adonis/Core/Validator'

import { CustomMessages, ResetPasswordValidator } from 'App/Validators/index'

import { ResetPasswordRepository } from '../Repositories/index'
import { TRecoveryPassword } from '../type'

export class ResetPasswordService {
  public async execute({ ctx, body }: TRecoveryPassword) {
    const userStoreValidator = new ResetPasswordValidator(ctx)
    await validator.validate({
      schema: userStoreValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new ResetPasswordRepository().handle({ ctx, body })
  }
}
