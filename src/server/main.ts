import {HttpException, ValidationPipe} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {green} from 'colors'
import {TypeormStore} from 'connect-typeorm'
import session from 'express-session'
import ms from 'ms'
import {RenderService} from 'nest-next'
import passport from 'passport'
import {join} from 'path'
import {cwd} from 'process'
import {envSchema} from 'src/shared/schema/env.schema'
import {DataSource} from 'typeorm'
import * as yup from 'yup'
import {AppModule} from './app.module'
import {Session} from './entities'
import {ProtectDocsMiddleware} from './middlewares/protect-docs.middleware'
import {RolesService} from './roles/roles.service'
import {UsersService} from './users/users.service'
import {Response} from 'express'
import {ParsedUrlQuery} from 'querystring'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config =
    app.get<ConfigService<yup.InferType<typeof envSchema>>>(ConfigService)
  const renderEngine = app.get(RenderService)
  const rolesService = app.get(RolesService)
  const usersService = app.get(UsersService)
  renderEngine.setErrorHandler(
    async (
      err: HttpException,
      _req: Request,
      res: Response,
      pathname: string,
      _query: ParsedUrlQuery,
    ) => {
      if (pathname.includes('api')) return res.json(err)
      return res.render('error', {
        message: err.message,
        status: err.getStatus && err.getStatus(),
      })
    },
  )
  const db = await new DataSource({
    type: 'sqlite',
    database: join(cwd(), 'database', 'data.db'),
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [Session],
  }).initialize()
  const repo = db.getRepository(Session)
  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: 'OSL_SESSION',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(repo),
      cookie: {
        maxAge: ms('30 days'),
        signed: true,
        httpOnly: true,
        sameSite: true,
      },
    }),
    passport.initialize(),
    passport.session(),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  )
  const docsConfig = new DocumentBuilder()
    .setTitle('OSL')
    .setDescription('OSL API docs')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, docsConfig)
  if (process.env.NODE_ENV === 'production') {
    app.use('/api/docs', ProtectDocsMiddleware)
  }
  SwaggerModule.setup('/api/docs', app, document)
  const PORT = config.getOrThrow('PORT')
  const rootRole = await rolesService.createRootRole()
  await usersService.createRootUser(rootRole)
  await rolesService.createBasicRole()
  await app.listen(PORT, async () =>
    console.log(green(`Server started on port http://localhost:${PORT}`)),
  )
}

bootstrap().catch(console.log)
