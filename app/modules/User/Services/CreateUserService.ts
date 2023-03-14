import { validator } from '@ioc:Adonis/Core/Validator'
import { CreateUserValidator, CustomMessages } from 'App/Validators/index'
import { TUser } from '../type'
import { CreateUserRepository } from './../Repositories/index'

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
