import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import colors from 'colors'
import { Request, Response } from 'express'
import { RenderService } from 'nest-next'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser(['TOP_SECRET']))
  const service = app.get(RenderService)
  service.setErrorHandler(async (err, req: Request, res: Response) => {
    // send JSON response
    if (req.method === 'GET') {
      switch (err.status) {
        case 401:
          return res.render('401', err.response)
        case 404:
          return res.render('404', err.response)
      }
    }
    return res.send(err.response)
  })
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
