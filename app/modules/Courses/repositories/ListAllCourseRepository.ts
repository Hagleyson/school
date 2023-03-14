import { Courser } from 'App/Models'
import { TListAllCourse } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListAllCourseRepository {
  public async handle(options: TListAllCourse) {
    try {
      if (options.noPaginate) {
        return await Courser.query().select('secure_id', 'name')
      }

      return await Courser.query().paginate(options.page, options.perPage)
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
