import NotFoundException from 'App/Exceptions/NotFoundException'
import User from 'App/Models/User'
import { TUser } from './../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class UpdateUserRepository {
  public async handle({ ctx, body }: TUser) {
    const secureId = ctx.request.param('id')
    try {
      const user = await User.findBy('secure_id', secureId)
      if (!user) {
        throw new NotFoundException('There is no user for this secure id', 404, 'E_NOT_FOUND')
      }
      user.merge({ ...body })
      await user.save()
      return ctx.response.created({ message: 'user updated successfully' })
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
