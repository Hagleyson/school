import User from 'App/Models/User'
import { TUser } from './../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListAllUserRepository {
  public async handle({ ctx }: TUser) {
    try {
      const user = await User.query()
      return user
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
