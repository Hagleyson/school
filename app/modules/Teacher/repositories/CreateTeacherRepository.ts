import { ITeacherDTO } from 'App/Dtos'
import Teacher from 'App/Models/Teacher'
import { Exception } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export class CreateTeacherRepository {
  public async handle(body: ITeacherDTO) {
    try {
      await Teacher.create({ ...body, birth_date: moment(body.birth_date, 'DD/MM/YYYY').toDate() })

      return { message: 'Teacher created successfully' }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
