import { validator } from '@ioc:Adonis/Core/Validator'
import { CourseValidator, CustomMessages } from 'App/Validators/index'
import { CreateCourseRepository } from '../repositories/index'
import { TCourse } from '../type'

export class CreateCourseService {
  public async execute({ ctx, body }: TCourse) {
    const courseValidator = new CourseValidator(ctx)

    await validator.validate({
      schema: courseValidator.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new CreateCourseRepository().handle(body!)
  }
}
