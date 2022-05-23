<<<<<<< HEAD
=======
import { Session } from './entities/session.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './../roles/entities/roles.entity'
>>>>>>> master
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
<<<<<<< HEAD
import { UsersModule } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { AuthenticateStrategy } from './strategies/authenticate.strategy'
import { AuthorizeStrategy } from './strategies/authorize.strategy'
import { RegisterStrategy } from './strategies/register.straegy'

@Module({
  imports: [
=======
import { RolesModule } from '../roles/roles.module'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthorizeStrategy } from './strategies/authorize.strategy'

@Module({
  imports: [
    PassportModule.register({}),
    TypeOrmModule.forFeature([Role, Session]),
>>>>>>> master
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
<<<<<<< HEAD
    PassportModule.register({}),
  ],
  providers: [
    AuthService,
    RegisterStrategy,
    AuthenticateStrategy,
    AuthorizeStrategy,
    ConfigService,
  ],
=======
    RolesModule,
  ],
  providers: [AuthService, AuthorizeStrategy, ConfigService],
>>>>>>> master
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
