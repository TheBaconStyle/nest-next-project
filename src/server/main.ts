import { NestFactory } from '@nestjs/core'
import colors from 'colors'
import { TypeormStore } from 'connect-typeorm/out'
import { Request } from 'express'
import ExpressSession from 'express-session'
import ms from 'ms'
import { RenderService } from 'nest-next'
import { getRepository } from 'typeorm'
import { AppModule } from './app.module'
import { Session } from './session.entity'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  const service = app.get(RenderService)
  const SessionRepo = getRepository(Session)
  service.setErrorHandler(async (err, req: Request, res) => {
    // send JSON response
    if (req.method !== 'GET') res.send(err.response)
  })
  app.use(
    ExpressSession({
      name: 'nest-next-proj',
      secret: 'TOP_SECRET',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: ms('1m'),
        sameSite: true,
        httpOnly: true,
      },
      store: new TypeormStore().connect(SessionRepo),
    }),
  )
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
