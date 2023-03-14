import { TDeleteUser } from './../type'
import { Exception } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'
import NotFoundException from 'App/Exceptions/NotFoundException'

export class DeleteUserRepository {
  public async handle({ secureId }: TDeleteUser) {
    try {
      const user = await User.query().where('secure_id', secureId).first()

      if (!user) {
        throw new NotFoundException('There is no user for this secure id', 404, 'E_NOT_FOUND')
      }

      await user.delete()
      return { message: 'user deleted successfully' }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
