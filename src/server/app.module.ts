import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
// import { AuthModule } from './auth/auth.module'
import { User } from './user/users.model'
import { UserModule } from './user/users.module'

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ conf: {}, dev: process.env.NODE_ENV === 'development' }),
      { viewsDir: null, dev: process.env.NODE_ENV === 'development' },
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/data.db',
      entities: [User],
      logging: process.env.NODE_ENV === 'development',
      synchronize: process.env.NODE_ENV === 'development',
    }),
    // AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
