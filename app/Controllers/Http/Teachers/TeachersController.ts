import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ITeacherDTO } from 'App/Dtos'
import {
  CreateTeacherService,
  UpdateTeacherService,
  ListAllTeacherServices,
  ListOneTeacherService,
  DeleteTeacherService,
} from 'App/modules/Teacher/service/index'

export default class TeachersController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, noPaginate } = request.qs()

    return new ListAllTeacherServices().execute({
      page: page ?? 1,
      perPage: perPage ?? 10,
      noPaginate: noPaginate ?? false,
    })
  }

  public async store(ctx: HttpContextContract) {
    const body = ctx.request.body() as ITeacherDTO
    return new CreateTeacherService().execute({ ctx, body })
  }

  public async update(ctx: HttpContextContract) {
    const body = ctx.request.body() as ITeacherDTO
    return new UpdateTeacherService().execute({ ctx, body })
  }

  public async destroy(ctx: HttpContextContract) {
    const secureId = ctx.request.param('id')
    return new DeleteTeacherService().execute({ ctx, secureId })
  }

  public async show({ params }: HttpContextContract) {
    const secure_id = params.id
    return new ListOneTeacherService().execute(secure_id)
  }
}
