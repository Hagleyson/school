import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IForgotDTO, IResetPasswordDTO } from 'App/Dtos'

export type TForgotPassword = {
  ctx: HttpContextContract
  body: IForgotDTO
}

export type TRecoveryPassword = {
  ctx: HttpContextContract
  body: IResetPasswordDTO
}
