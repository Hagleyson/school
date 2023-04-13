/* eslint-disable import-helpers/order-imports */
import { ExceptionsLoggerCreator } from 'App/Helpers'
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

import Youch from 'youch'
export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }
  public async handle(error, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    }
    if (error.code === 'E_INTERNAL_SERVER_ERROR') {
      await new ExceptionsLoggerCreator().execute(error.code, error.message)
      return ctx.response.status(500).send(error.message)
    }
    if (error.code === 'E_INVALID_API_TOKEN') {
      return ctx.response.status(404).send({ message: 'Invalid API token' })
    }
    if (error.code === 'E_ALREADY_EXISTS') {
      return ctx.response.status(422).send({ message: error.message })
    }

    if (Env.get('NODE_ENV') === 'development') {
      if (error.status === 500) {
        await new ExceptionsLoggerCreator().execute(error.code, error.message)
      }
      const youch = new Youch(error, ctx.request.request)
      const errorJSON = await youch.toJSON()
      return ctx.response.status(error.status).send(errorJSON)
    }

    return super.handle(error, ctx)
  }
}
