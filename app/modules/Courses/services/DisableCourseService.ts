import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DisableCourseRepository } from '../repositories/index'

export class DisableCourseService {
  public async execute(ctx: HttpContextContract) {
    return new DisableCourseRepository().handle(ctx)
  }
}
