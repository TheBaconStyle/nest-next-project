import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { Session } from './auth/entities/session.entity'
<<<<<<< HEAD
import { Role } from './users/entities/roles.entity'
=======
import { Role } from './roles/entities/roles.entity'
>>>>>>> master
import { User } from './users/entities/users.entity'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        conf: {
          useFileSystemPublicRoutes: false,
        },
        dev: process.env.NODE_ENV === 'development',
        customServer: true,
      }),
      {
        viewsDir: null,
        dev: process.env.NODE_ENV === 'development',
        passthrough404: true,
      },
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/data.db',
      entities: [User, Session, Role],
<<<<<<< HEAD
      // logging: process.env.NODE_ENV === 'development',
=======
>>>>>>> master
      logging: false,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RouterModule.register([{ path: '/auth', module: AuthModule }]),
  ],
  controllers: [AppController],
})
export class AppModule {}
