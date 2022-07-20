import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import Fingerprint, {
  acceptHeaders,
  ip,
  useragent,
} from '@shwao/express-fingerprint'
import colors from 'colors'
import { Request, Response } from 'express'
import { RenderService } from 'nest-next'
import { AppModule } from './app.module'
import { RolesService } from './roles/roles.service'
import { ProtectDocs } from './shared/middlewares/protect-docs.middleware'
import { UsersService } from './users/users.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV !== 'development',
    }),
  )
  const docConfig = new DocumentBuilder()
    .setTitle('OSL')
    .setDescription('OSL API docs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, docConfig)
  app.use(Fingerprint({ parameters: [useragent, acceptHeaders, ip] }))
  if (process.env.NODE_ENV !== 'development') app.use('/api/docs', ProtectDocs)
  SwaggerModule.setup('api/docs', app, document)
  const config = app.get(ConfigService)
  const renderer = app.get(RenderService)
  renderer.setErrorHandler(
    async (
      err: { response: { message: string } },
      req: Request,
      res: Response,
    ) => {
      if (req.path.includes('api')) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        if (err.response.message) {
          return res.send({ message: err.response.message })
        }
        return res.send(err)
      }
      return res.render('404')
    },
  )
  const rolesService = app.get(RolesService)
  await rolesService.createBasicRole()
  const rootRole = await rolesService.createRootRole()
  const usersService = app.get(UsersService)
  usersService.createRootUser(rootRole)
  const PORT = config.get('PORT')
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
