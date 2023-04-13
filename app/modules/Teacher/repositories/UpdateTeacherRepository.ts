import Database from '@ioc:Adonis/Lucid/Database'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { Teacher } from 'App/Models'
import { TTeacher } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class UpdateTeacherRepository {
  public async handle({ ctx, body }: TTeacher) {
    const trx = await Database.transaction()
    const secureId = ctx.request.param('id')

    try {
      const address = body?.address
      const teacher = await Teacher.query().where('secure_id', secureId).preload('address').first()

      if (!teacher) {
        throw new NotFoundException('There is no Teacher for this secure id', 404, 'E_NOT_FOUND')
      }

      await teacher
        .merge({
          ...body,
          birth_date: moment(body!.birth_date, 'DD/MM/YYYY').toDate(),
        })
        .useTransaction(trx)
        .save()

      if (address) {
        await teacher.useTransaction(trx).related('address').updateOrCreate({}, address)
      }

      return ctx.response.created({ message: 'successfully updated' })
    } catch (error) {
      await trx.rollback()

      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
