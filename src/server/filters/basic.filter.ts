import {ArgumentsHost, Catch, ExceptionFilter, HttpException,} from '@nestjs/common'
import {Request, Response} from 'express'
import {RenderableResponse} from 'nest-next'

@Catch(HttpException)
export class BasicFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const message = exception.message
    const response = ctx.getResponse<RenderableResponse & Response>()
    // if (process.env.NODE_ENV === 'development') console.log(exception)
    response.status(status)
    if (request.path.includes('api')) {
      return response.json({message})
    }
    response.render('error', {status, message})
  }
}
