import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export class CourseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    teacher_secure_id: schema.string(),
    name: schema.string(),
    content: schema.string(),
    target_audience: schema.string(),
  })

  public messages: CustomMessages = {}
}
