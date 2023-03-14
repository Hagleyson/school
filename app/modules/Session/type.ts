import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ISessionDTO } from 'App/Dtos'

export type TSessionDTO = {
  ctx: HttpContextContract
  body: ISessionDTO
}
