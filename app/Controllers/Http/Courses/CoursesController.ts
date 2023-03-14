import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ICourseDTO } from 'App/Dtos'
import {
  CreateCourseService,
  DeleteCourseService,
  DisableCourseService,
  ListAllCourseService,
  ListOneCourseService,
  UpdateCourseService,
} from 'App/modules/Courses/services/index'
export default class CoursesController {
  public async index({ request }: HttpContextContract) {
    const { page, perPage, noPaginate } = request.qs()

    return new ListAllCourseService().execute({
      page: page ?? 1,
      perPage: perPage ?? 10,
      noPaginate: noPaginate ?? false,
    })
  }

  public async store(ctx: HttpContextContract) {
    const body = ctx.request.body() as ICourseDTO
    return new CreateCourseService().execute({ ctx, body })
  }

  public async update(ctx: HttpContextContract) {
    const body = ctx.request.body() as ICourseDTO
    return new UpdateCourseService().execute({ ctx, body })
  }

  public async destroy(ctx: HttpContextContract) {
    const secureId = ctx.request.param('id')
    return new DeleteCourseService().execute({ ctx, secureId })
  }

  public async show({ params }: HttpContextContract) {
    const secure_id = params.id
    return new ListOneCourseService().execute(secure_id)
  }
  public async disableCourse(ctx: HttpContextContract) {
    return new DisableCourseService().execute(ctx)
  }
}
