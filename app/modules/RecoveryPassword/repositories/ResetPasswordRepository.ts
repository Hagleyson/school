import NotFoundException from 'App/Exceptions/NotFoundException'
import { Exception } from '@adonisjs/core/build/standalone'
import { TRecoveryPassword } from '../type'
import User from 'App/Models/User'

import TokenExpiredException from 'App/Exceptions/TokenExpiredException'
export class ResetPasswordRepository {
  public async handle({ ctx, body }: TRecoveryPassword) {
    try {
      const userByToken = await User.query()
        .preload('tokens')
        .whereHas('tokens', (tokens) => tokens.where('token', body.token))
        .first()

      if (!userByToken) {
        throw new NotFoundException('Token not found', 404, 'E_NOT_FOUND')
      }
      if (Math.abs(userByToken.tokens[0].createdAt.diffNow('hours').hours) > 2) {
        throw new TokenExpiredException()
      }

      userByToken.password = body.password
      await userByToken.save()
      await userByToken.tokens[0].delete()
      return ctx.response.noContent()
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
