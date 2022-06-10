import { UsersModule } from './users/users.module'
import { Booking } from './bookings/entities/bookings.entity'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { join } from 'path'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { Role } from './roles/entities/roles.entity'
import { Session } from './auth/entities/sessions.entity'
import { User } from './users/entities/users.entity'
import { BookingsModule } from './bookings/bookings.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
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
      database: join(__dirname, '..', 'database', 'data.db'),
      entities: [User, Session, Role, Booking],
      logging: false,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    BookingsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
