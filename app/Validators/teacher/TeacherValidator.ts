import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export class TeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    last_name: schema.string(),
    cpf: schema.string(),
    training: schema.string(),
    birth_date: schema.date({ format: 'dd/mm/yyyy' }),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'teachers', column: 'email' })]),
    alternative_email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'teachers', column: 'alternative_email' }),
    ]),
    rg: schema.string(),
    gender: schema.string(),
    naturalness: schema.string(),
    scholarship: schema.string(),
    phone: schema.string(),
    alternative_phone: schema.string(),
    address: schema.object().members({
      street: schema.string(),
      number: schema.string(),
      neighborhood: schema.string(),
      complement: schema.string.optional(),
    }),
  })

  public messages: CustomMessages = {}
}
