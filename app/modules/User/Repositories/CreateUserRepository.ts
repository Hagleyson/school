import { IUserDTO } from 'App/Dtos'
import User from 'App/Models/User'
import { Exception } from '@adonisjs/core/build/standalone'

export class CreateUserRepository {
  public async handle(body: IUserDTO) {
    try {
      await User.create(body)

      return { message: 'user created successfully' }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
