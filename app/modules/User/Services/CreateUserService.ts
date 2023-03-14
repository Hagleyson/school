import { validator } from '@ioc:Adonis/Core/Validator'

import { CreateUserValidator, CustomMessages } from 'App/Validators/index'

import { CreateUserRepository } from './../Repositories/index'
import { TUser } from '../type'

export class CreateUserService {
  public async execute({ ctx, body }: TUser) {
    const userStoreValidator = new CreateUserValidator(ctx)

    await validator.validate({
      schema: userStoreValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new CreateUserRepository().handle(body!)
  }
}
