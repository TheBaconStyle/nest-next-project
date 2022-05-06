import { NestFactory } from '@nestjs/core'
import ExpressSession from 'express-session'
import colors from 'colors'

import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.use(
    ExpressSession({
      secret: 'TOP_SECRET',
      saveUninitialized: false,
      resave: false,
    }),
  )
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
