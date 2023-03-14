import NotFoundException from 'App/Exceptions/NotFoundException'
import { Teacher } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListOneTeacherRepository {
  public async handle(secure_id: string) {
    try {
      const teacher = await Teacher.query()

        .where('secure_id', secure_id)
        .first()
      if (!teacher) {
        throw new NotFoundException('There is no dependent for this secure id', 404, 'E_NOT_FOUND')
      }

      return teacher
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
