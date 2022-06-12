import { UsersService } from './users/users.service'
import { RolesService } from './roles/roles.service'
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
import passport from 'passport'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('OSL')
    .setDescription('OSL API docs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  app.use(Fingerprint({ parameters: [useragent, acceptHeaders, ip] }))
  app.use('/api/docs', passport.authorize('AUTH_AUTHORIZE'))
  SwaggerModule.setup('api/docs', app, document)
  const appConfig = app.get(ConfigService)
  const service = app.get(RenderService)
  service.setErrorHandler(
    async (
      err: { response: { message: string } },
      req: Request,
      res: Response,
    ) => {
      if (req.path.includes('/api') && req.body) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        if (err.response.message) {
          return res.send({ message: err.response.message })
        }
        return
      }
      return res.render('404')
    },
  )

  const rolesService = app.get(RolesService)
  await rolesService.createBasicRole()
  const rootRole = await rolesService.createRootRole()
  const usersService = app.get(UsersService)
  usersService.createRootUser(rootRole)
  const PORT = appConfig.get('PORT')
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
