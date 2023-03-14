import { ICourseDTO } from 'App/Dtos'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser, Teacher } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'

export class CreateCourseRepository {
  public async handle({ content, name, target_audience, teacher_secure_id }: ICourseDTO) {
    try {
      const teacher = await Teacher.query().where('secure_id', teacher_secure_id).first()

      if (!teacher) {
        throw new NotFoundException('There is no Teacher for this secure id', 404, 'E_NOT_FOUND')
      }
      await Courser.create({
        content,
        name,
        target_audience,
        teacher_id: teacher.id,
        status: 'active',
      })

      return { message: 'Course created successfully' }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
