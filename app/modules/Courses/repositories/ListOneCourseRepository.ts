import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class ListOneCourseRepository {
  public async handle(secure_id: string) {
    try {
      const course = await Courser.query().where('secure_id', secure_id).preload('teacher').first()

      if (!course) {
        throw new NotFoundException('There is no dependent for this secure id', 404, 'E_NOT_FOUND')
      }

      return {
        secure_id: course.secure_id,
        name: course.name,
        target_audience: course.target_audience,
        content: course.content,
        teacher_secure_id: course.teacher.secure_id,
        start_date: moment(course.start_date).utc().format('DD/MM/YYYY'),
        end_date: moment(course.end_date).utc().format('DD/MM/YYYY'),
        enroll_start_date: moment(course.enroll_start_date).utc().format('DD/MM/YYYY'),
        enroll_end_date: moment(course.enroll_end_date).utc().format('DD/MM/YYYY'),
      }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
