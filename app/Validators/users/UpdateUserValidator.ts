import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.minLength(3)]),
    email: schema.string.optional({}, [rules.email()]),
    phone: schema.string(),
  })

  public messages: CustomMessages = {}
}
