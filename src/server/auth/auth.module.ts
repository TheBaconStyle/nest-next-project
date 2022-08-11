import { RolesModule } from './../roles/roles.module'
import { UsersModule } from './../users/users.module'
import { Session } from '../entities/sessions.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { AuthorizeStrategy } from './authorize.strategy'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Session]),
    UsersModule,
    RolesModule,
  ],
  providers: [AuthService, AuthorizeStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
