import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3)]),
    password: schema.string(),
    email: schema.string({}, [rules.email()]),
    phone: schema.string({}),
  })

  public messages: CustomMessages = {}
}
