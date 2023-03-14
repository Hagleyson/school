import { Teacher } from 'App/Models'
import { TListAllTeacher } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListAllTeacherRepository {
  public async handle(options: TListAllTeacher) {
    try {
      if (options.noPaginate) {
        return await Teacher.query().select('secure_id', 'name')
      }

      return await Teacher.query().paginate(options.page, options.perPage)
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
