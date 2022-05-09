import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { Session } from './auth/session.entity'
import { User } from './users/users.entity'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/data.db',
      entities: [User, Session],
      logging: process.env.NODE_ENV === 'development',
      synchronize: process.env.NODE_ENV === 'development',
    }),
    RenderModule.forRootAsync(
      Next({
        conf: {},
        dev: process.env.NODE_ENV === 'development',
        customServer: true,
      }),
      {
        viewsDir: null,
        dev: process.env.NODE_ENV === 'development',
        passthrough404: true,
      },
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],

  exports: [],
})
export class AppModule {}
