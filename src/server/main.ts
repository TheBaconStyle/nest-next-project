import { ProtectDocsMiddleware } from './middlewares/protect-docs.middleware'
import { BasicFilter } from './filters/basic.filter'
import { UsersService } from './users/users.service'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { green } from 'colors'
import { AppModule } from './app.module'
import { RolesService } from './roles/roles.service'
import Fingerprint, {
  acceptHeaders,
  ip,
  useragent,
} from '@shwao/express-fingerprint'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const rolesService = app.get(RolesService)
  const usersService = app.get(UsersService)
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
