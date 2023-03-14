import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export class TeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    last_name: schema.string(),
    cpf: schema.string(),
    training: schema.string(),
    birth_date: schema.date({ format: 'dd/mm/yyyy' }),
  })

  public messages: CustomMessages = {}
}
