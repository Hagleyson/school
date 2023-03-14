import { validator } from '@ioc:Adonis/Core/Validator'
import { CustomMessages, CreateSessionValidator } from 'App/Validators/index'
import { CreateSessionRepository } from '../Repositories/index'
import { TSessionDTO } from '../type'

export class CreateSessionService {
  public async execute({ ctx, body }: TSessionDTO) {
    const userStoreValidator = new CreateSessionValidator(ctx)
    await validator.validate({
      schema: userStoreValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new CreateSessionRepository().handle({ ctx, body })
  }
}
