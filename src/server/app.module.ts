import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { join } from 'path'
import * as yup from 'yup'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { Session } from './auth/entities/sessions.entity'
import { BookingsModule } from './bookings/bookings.module'
import { Booking } from './bookings/entities/bookings.entity'
import { CategoriesModule } from './categories/categories.module'
import { Category } from './categories/entities/categories.entity'
import { Facility } from './facilities/entities/facilities.entity'
import { FacilitiesModule } from './facilities/facilities.module'
import { Role } from './roles/entities/roles.entity'
import { RolesModule } from './roles/roles.module'
import { User } from './users/entities/users.entity'
import { UsersModule } from './users/users.module'

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
      entities: [User, Session, Role, Booking, Facility, Category],
      logging: false,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      async validate(config) {
        const schema = yup.object().shape({
          PORT: yup.number().required('server port is required'),
          ROOT_PASSWORD: yup.string().required('root password is required'),
          MAX_BOOKINGS_PER_USER: yup.number().default(5),
        })
        try {
          return await schema.validate(config)
        } catch (e) {
          console.error(e)
          process.exit(1)
        }
      },
    }),
    AuthModule,
    RolesModule,
    BookingsModule,
    UsersModule,
    FacilitiesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
