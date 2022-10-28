import {forwardRef, Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {ServeStaticModule} from '@nestjs/serve-static'
import {TypeOrmModule} from '@nestjs/typeorm'
import {RenderModule} from 'nest-next'
import next from 'next'
import {join} from 'path'
import {cwd} from 'process'
import {envSchema} from 'src/shared/schema/env.schema'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AuthModule} from './auth/auth.module'
import {BookingsModule} from './bookings/bookings.module'
import {CategoriesModule} from './categories/categories.module'
import {Booking, Category, Facility, Role, Session, User} from './entities'
import {FacilitiesModule} from './facilities/facilities.module'
import {RolesModule} from './roles/roles.module'
import {UsersModule} from './users/users.module'

@Module({
  imports: [
    RenderModule.forRootAsync(
      next({
        conf: {
          cleanDistDir: true,
          useFileSystemPublicRoutes: false,
          reactStrictMode: true,
          assetPrefix: 'http://localhost:3000',
          compress: true,
          swcMinify: true,
          devIndicators: {buildActivity: false},
        },
        dev: process.env.NODE_ENV !== 'production',
        customServer: true,
      }),
      {
        dev: process.env.NODE_ENV !== 'production',
        passthrough404: true,
      },
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
      rootPath: join(cwd(), 'public'),
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
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
    forwardRef(() => BookingsModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => FacilitiesModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
