<<<<<<< HEAD
import { NestFactory } from '@nestjs/core'
import colors from 'colors'
import { Request, Response } from 'express'
import { RenderService } from 'nest-next'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  const service = app.get(RenderService)
  service.setErrorHandler(async (err, req: Request, res: Response) => {
    if (req.method === 'GET') {
      switch (err.status) {
        case 401:
          return res.redirect('/auth/signin')
        case 404:
          return res.render('404', err.response)
      }
    }
    return res.send(err.response)
  })
  const PORT = process.env.PORT

=======
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import { Response } from 'express'
import { RenderService } from 'nest-next'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('OSL')
    .setDescription('OSL API docs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  const appConfig = app.get(ConfigService)
  app.use(cookieParser(appConfig.get('COOKIE_SECRET')))
  const service = app.get(RenderService)
  service.setErrorHandler(
    async (err: { response: { message: string } }, req, res: Response) => {
      console.log(err)
      return res.send({ message: err.response.message })
    },
  )
  const PORT = appConfig.get('PORT')
>>>>>>> master
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
