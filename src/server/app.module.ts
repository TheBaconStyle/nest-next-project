import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UserModel } from './user/user.model'

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ conf: {}, dev: process.env.NODE_ENV === 'development' }),
      { viewsDir: null, dev: process.env.NODE_ENV === 'development' },
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/data.db',
      entities: [UserModel],
      logging: process.env.NODE_ENV === 'development',
      synchronize: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
