import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListOneCourseRepository {
  public async handle(secure_id: string) {
    try {
      const course = await Courser.query().where('secure_id', secure_id).preload('teacher').first()

      if (!course) {
        throw new NotFoundException('There is no dependent for this secure id', 404, 'E_NOT_FOUND')
      }

      return course
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
