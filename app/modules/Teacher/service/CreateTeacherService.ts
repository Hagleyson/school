import { validator } from '@ioc:Adonis/Core/Validator'
import { CreateTeacherValidator, CustomMessages } from 'App/Validators/index'
import { CreateTeacherRepository } from '../repositories/index'
import { TTeacher } from '../type'

export class CreateTeacherService {
  public async execute({ ctx, body }: TTeacher) {
    const teacherValidator = new CreateTeacherValidator(ctx)

    await validator.validate({
      schema: teacherValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new CreateTeacherRepository().handle(body!)
  }
}
