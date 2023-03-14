import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ICourseDTO } from 'App/Dtos'

export type TCourse = {
  ctx: HttpContextContract
  body?: ICourseDTO
}

export type TListAllCourse = {
  noPaginate?: boolean
  page: number
  perPage: number
}

export type TDeleteCourse = {
  ctx: HttpContextContract
  secureId: string
}
