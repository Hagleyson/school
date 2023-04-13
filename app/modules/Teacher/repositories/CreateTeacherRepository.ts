import Database from '@ioc:Adonis/Lucid/Database'
import { ITeacherDTO } from 'App/Dtos'
import Teacher from 'App/Models/Teacher'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class CreateTeacherRepository {
  public async handle(body: ITeacherDTO) {
    const trx = await Database.transaction()
    try {
      const teacher = await Teacher.create(
        {
          ...body,
          birth_date: moment(body.birth_date, 'DD/MM/YYYY').toDate(),
        },
        { client: trx }
      )

      await teacher.useTransaction(trx).related('address').create(body.address)
      await trx.commit()

      return { message: 'Teacher created successfully' }
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
