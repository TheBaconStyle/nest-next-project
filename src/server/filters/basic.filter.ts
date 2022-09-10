import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { RenderableResponse } from 'nest-next'

@Catch(HttpException)
export class BasicFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (process.env.NODE_ENV === 'development') console.log(exception)
    const ctx = host.switchToHttp()
    const status = exception.getStatus()
    const message = exception.message
    const response = ctx.getResponse<Response & RenderableResponse>()
    const request = ctx.getRequest() as Request
    response.status(status)
    if (request.method === 'GET') {
      return response.render(`errors/${status}`)
    }
    response.json({ message })
  }
}
