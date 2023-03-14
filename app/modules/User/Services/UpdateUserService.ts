import { validator } from '@ioc:Adonis/Core/Validator'
import { UpdateUserValidator, CustomMessages } from 'App/Validators/index'
import { UpdateUserRepository } from '../Repositories/index'
import { TUser } from '../type'

export class UpdateUserService {
  public async execute({ ctx, body }: TUser) {
    const userStoreValidator = new UpdateUserValidator(ctx)
    await validator.validate({
      schema: userStoreValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new UpdateUserRepository().handle({ ctx, body })
  }
}
