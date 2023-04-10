import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'

export class DisableCourseRepository {
  public async handle(ctx: HttpContextContract) {
    const secureId = ctx.request.param('id')

    try {
      const course = await Courser.query().where('secure_id', secureId).first()

      if (!course) {
        throw new NotFoundException('There is no Course for this secure id', 404, 'E_NOT_FOUND')
      }

      course
        .merge({
          status: course.status === 'active' ? 'inactive' : 'active',
        })
        .save()

      return ctx.response.created({ message: 'course disabled successfully' })
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
