import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IUserDTO } from 'App/Dtos'

export type TUser = {
  ctx: HttpContextContract
  body?: IUserDTO
}
export type TDeleteUser = {
  ctx: HttpContextContract
  secureId: string
}
