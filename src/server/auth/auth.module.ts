import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../roles/entities/roles.entity'
import { RolesModule } from './../roles/roles.module'
import { UsersModule } from '../users/users.module'
import { AuthAPIController } from './controllers/auth-api.controller'
import { AuthController } from './controllers/auth.controller'
import { Session } from './entities/sessions.entity'
import { AuthService } from './services/auth.service'
import { SessionsService } from './services/sessions.service'
import { AuthorizeStrategy } from './strategies/authorize.strategy'

@Module({
  imports: [
    PassportModule.register({}),
    TypeOrmModule.forFeature([Session]),
    UsersModule,
    RolesModule,
  ],
  controllers: [AuthController, AuthAPIController],
  providers: [AuthService, AuthorizeStrategy, SessionsService],
  exports: [AuthService, SessionsService],
})
export class AuthModule {}
