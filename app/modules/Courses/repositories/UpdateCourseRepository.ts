import NotFoundException from 'App/Exceptions/NotFoundException'
import { Courser, Teacher } from 'App/Models'
import { TCourse } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class UpdateCourseRepository {
  public async handle({ ctx, body }: TCourse) {
    const secureId = ctx.request.param('id')

    try {
      const teacher = await Teacher.query().where('secure_id', body!.teacher_secure_id).first()
      const course = await Courser.query().where('secure_id', secureId).first()
      if (!teacher) {
        throw new NotFoundException('There is no Teacher for this secure id', 404, 'E_NOT_FOUND')
      }
      if (!course) {
        throw new NotFoundException('There is no Course for this secure id', 404, 'E_NOT_FOUND')
      }

      course
        .merge({
          name: body?.name,
          content: body?.content,
          target_audience: body?.target_audience,
          teacher_id: teacher.id,
          enroll_start_date: moment(body?.enroll_start_date, 'DD/MM/YYYY').toDate(),
          enroll_end_date: moment(body?.enroll_end_date, 'DD/MM/YYYY').toDate(),
          start_date: moment(body?.start_date, 'DD/MM/YYYY').toDate(),
          end_date: moment(body?.end_date, 'DD/MM/YYYY').toDate(),
        })
        .save()

      return ctx.response.created({ message: 'successfully updated' })
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
