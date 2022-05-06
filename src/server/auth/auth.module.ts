import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/users.module'
import { AuthService } from './auth.service'
import { localStrategy } from './local.strategy'

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, localStrategy],
})
export class AuthModule {}
