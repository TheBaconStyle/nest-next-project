import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import Fingerprint, {
  acceptHeaders,
  ip,
  useragent,
} from '@shwao/express-fingerprint'
import { green } from 'colors'
import { TypeormStore } from 'connect-typeorm'
import session from 'express-session'
import ms from 'ms'
import passport from 'passport'
import { join } from 'path'
import { cwd } from 'process'
import { envSchema } from 'src/shared/schema/env.schema'
import { DataSource } from 'typeorm'
import * as yup from 'yup'
import { AppModule } from './app.module'
import { Session } from './entities/sessions.entity'
import { BasicFilter } from './filters/basic.filter'
import { ProtectDocsMiddleware } from './middlewares/protect-docs.middleware'
import { RolesService } from './roles/roles.service'
import { UsersService } from './users/users.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config =
    app.get<ConfigService<yup.InferType<typeof envSchema>>>(ConfigService)
  const rolesService = app.get(RolesService)
  const usersService = app.get(UsersService)
  const db = await new DataSource({
    type: 'sqlite',
    database: join(cwd(), 'database', 'data.db'),
    synchronize: config.get<string>('NODE_ENV') !== 'production',
    entities: [Session],
  }).initialize()
  const repo = db.getRepository(Session)
  app.use(
    session({
      secret: config.get('SESSION_SECRET'),
      name: 'OSL_SESS_ID',
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
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalFilters(new BasicFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
    }),
  )
  app.use(Fingerprint({ parameters: [useragent, acceptHeaders, ip] }))
  const docsConfig = new DocumentBuilder()
    .setTitle('OSL')
    .setDescription('OSL API docs')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, docsConfig)
  if (config.get('NODE_ENV') === 'production') {
    app.use('/api/docs', ProtectDocsMiddleware)
  }
  SwaggerModule.setup('/api/docs', app, document)
  const rootRole = await rolesService.createRootRole()
  await usersService.createRootUser(rootRole)
  await rolesService.createBasicRole()
  const PORT = config.get('PORT')
  await app.listen(PORT)
  console.log(green(`Server started on port http://localhost:${PORT}`))
}

bootstrap()
