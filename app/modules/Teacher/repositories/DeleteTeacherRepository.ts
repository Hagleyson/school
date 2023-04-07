import NotFoundException from 'App/Exceptions/NotFoundException'
import { Teacher } from 'App/Models'
import { TDeleteTeacher } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class DeleteTeacherRepository {
  public async handle({ secureId }: TDeleteTeacher) {
    try {
      const teacher = await Teacher.query().where('secure_id', secureId).preload('course').first()
      if (!teacher) {
        throw new NotFoundException('There is no teacher for this secure id', 404, 'E_NOT_FOUND')
      }
      console.log(teacher?.toJSON())

      if (teacher?.course.length > 0) {
        throw new NotFoundException('this teacher is linked to a course', 422, 'E_USER_LINKED')
      }
      return teacher.delete()
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
