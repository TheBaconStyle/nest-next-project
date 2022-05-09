import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SessionSerializer } from './session.serializer'
import { SignInStrategy } from './signin.strategy'
import { SignUpStrategy } from './signup.strategy'

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, SignInStrategy, SignUpStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
