import { AuthorizeStrategy } from './authorize.strategy'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from '../entities/sessions.entity'
import { RolesModule } from './../roles/roles.module'
import { UsersModule } from './../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthenticateStrategy } from './authenticate.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Session]),
    UsersModule,
    RolesModule,
  ],
  providers: [
    AuthService,
    SessionSerializer,
    AuthenticateStrategy,
    AuthorizeStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
