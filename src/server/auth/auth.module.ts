import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { UsersModule } from '../user/users.module'

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
