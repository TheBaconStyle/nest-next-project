import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import colors from 'colors'

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, () => {
    console.log(colors.green(`Server started at http://localhost:${PORT}`))
  })
}

bootstrap()
