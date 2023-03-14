import { TSessionDTO } from '../type'
import { Exception } from '@adonisjs/core/build/standalone'

export class CreateSessionRepository {
  public async handle({ ctx, body }: TSessionDTO) {
    const { email, password } = body
    try {
      const { token, type, expiresAt, user } = await ctx.auth
        .use('api')
        .attempt(email, password, { expiresIn: '10hours' })

      const { secure_id, name, email: newEmail, phone } = user

      return ctx.response.ok({
        token,
        type,
        expiresAt,
        user: {
          secure_id,
          name,
          email: newEmail,
          phone,
        },
      })
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
