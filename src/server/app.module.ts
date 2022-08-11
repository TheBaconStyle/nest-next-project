import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RenderModule } from 'nest-next'
import next from 'next'
import { join } from 'path'
import { cwd } from 'process'
import { envSchema } from 'src/shared/schema/env.schema'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookingsModule } from './bookings/bookings.module'
import { CategoriesModule } from './categories/categories.module'
import { Booking } from './entities/bookings.entity'
import { Category } from './entities/categories.entity'
import { Facility } from './entities/facilities.entity'
import { Role } from './entities/roles.entity'
import { Session } from './entities/sessions.entity'
import { User } from './entities/users.entity'
import { FacilitiesModule } from './facilities/facilities.module'
import { RolesModule } from './roles/roles.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  imports: [
    RenderModule.forRootAsync(
      next({
        conf: {
          cleanDistDir: true,
          useFileSystemPublicRoutes: false,
          reactStrictMode: true,
        },
        dev: process.env.NODE_ENV !== 'production',
        customServer: true,
      }),
      { dev: process.env.NODE_ENV !== 'production' },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(cwd(), '.env'),
      validate(config) {
        try {
          return envSchema.validateSync(config)
        } catch (e) {
          console.log(e)
          process.exit(1)
        }
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'sqlite',
          database: join(cwd(), 'database', 'data.db'),
          entities: [Session, User, Role, Booking, Facility, Category],
          logging: false,
          synchronize: configService.get('NODE_ENV') !== 'production',
        }
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    BookingsModule,
    CategoriesModule,
    FacilitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
