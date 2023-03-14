import { validator } from '@ioc:Adonis/Core/Validator'
import { CourseValidator, CustomMessages } from 'App/Validators/index'
import { UpdateCourseRepository } from '../repositories/index'
import { TCourse } from '../type'

export class UpdateCourseService {
  public async execute({ ctx, body }: TCourse) {
    const courseValidade = new CourseValidator(ctx)
    await validator.validate({
      schema: courseValidade.schema,
      data: body,
      messages: new CustomMessages().messages,
    })

    return new UpdateCourseRepository().handle({ ctx, body })
  }
}
