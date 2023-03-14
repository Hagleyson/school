import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ITeacherDTO } from 'App/Dtos'

export type TTeacher = {
  ctx: HttpContextContract
  body?: ITeacherDTO
}

export type TListAllTeacher = {
  noPaginate?: boolean
  page: number
  perPage: number
}

export type TDeleteTeacher = {
  ctx: HttpContextContract
  secureId: string
}
