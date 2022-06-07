import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthAPIController } from './controllers/auth-api.controller'
import { AuthController } from './controllers/auth.controller'
import { Role } from './entities/roles.entity'
import { Session } from './entities/sessions.entity'
import { User } from './entities/users.entity'
import { AuthService } from './services/auth.service'
import { RolesService } from './services/roles.service'
import { SessionsService } from './services/sessions.service'
import { UsersService } from './services/users.service'
import { AuthorizeStrategy } from './strategies/authorize.strategy'

@Module({
  imports: [
    PassportModule.register({}),
    TypeOrmModule.forFeature([Role, Session, User]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AuthorizeStrategy,
    ConfigService,
    RolesService,
    SessionsService,
    UsersService,
  ],
  controllers: [AuthController, AuthAPIController],
  exports: [AuthService, UsersService, RolesService, SessionsService],
})
export class AuthModule {}
