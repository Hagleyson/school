import { ICourseDTO } from 'App/Dtos'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser, Teacher } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class CreateCourseRepository {
  public async handle({
    content,
    name,
    target_audience,
    teacher_secure_id,
    end_date,
    enroll_end_date,
    enroll_start_date,
    start_date,
  }: ICourseDTO) {
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
        enroll_start_date: moment(enroll_start_date, 'DD/MM/YYYY').toDate(),
        enroll_end_date: moment(enroll_end_date, 'DD/MM/YYYY').toDate(),
        start_date: moment(start_date, 'DD/MM/YYYY').toDate(),
        end_date: moment(end_date, 'DD/MM/YYYY').toDate(),
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
