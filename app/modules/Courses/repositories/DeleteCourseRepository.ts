import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser } from 'App/Models'
import { TDeleteCourse } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class DeleteCourseRepository {
  public async handle({ ctx, secureId }: TDeleteCourse) {
    try {
      const course = await Courser.query().where('secure_id', secureId).first()

      if (!course) {
        throw new NotFoundException('There is no course for this secure id', 404, 'E_NOT_FOUND')
      }

      await course.delete()
      return ctx.response.ok({ message: 'Course deleted successfully' })
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
