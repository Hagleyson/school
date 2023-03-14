import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenExpiredException from 'App/Exceptions/TokenExpiredException'
import { ForgotPasswordValidator, ResetPasswordValidator } from 'App/Validators/index'
import User from 'App/Models/User'
import { randomBytes } from 'crypto'
import moment from 'moment'
import { promisify } from 'util'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email, url } = await request.validate(ForgotPasswordValidator)
    const user = await User.findByOrFail('email', email)
    const random = await promisify(randomBytes)(24)
    const token = random.toString('hex')

    await user.related('tokens').updateOrCreate({ userId: user.id }, { token })

    const resetPasswordUrlWithToken = `${url}?token=${token}`

    await Mail.send((message) => {
      message
        .from('GEPT')
        .to(email)
        .subject('Recuperação de Senha.')
        .htmlView('email/forgotpassword', {
          productName: 'gept',
          name: user.name,
          resetPasswordUrl: resetPasswordUrlWithToken,
          date: moment().year(),
        })
    })

    return response.noContent()
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const { token, password } = await request.validate(ResetPasswordValidator)
    const userByToken = await User.query()
      .whereHas('tokens', (tokens) => tokens.where('token', token))
      .preload('tokens')
      .firstOrFail()

    if (Math.abs(userByToken.tokens[0].createdAt.diffNow('hours').hours) > 2) {
      throw new TokenExpiredException()
    }

    userByToken.password = password
    await userByToken.save()
    await userByToken.tokens[0].delete()
    return response.noContent()
  }
}
