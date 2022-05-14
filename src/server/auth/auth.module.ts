import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { AuthenticateStrategy } from './strategies/authenticate.strategy'
import { AuthorizeStrategy } from './strategies/authorize.strategy'
import { RegisterStrategy } from './strategies/register.straegy'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PassportModule.register({}),
  ],
  providers: [
    AuthService,
    RegisterStrategy,
    AuthenticateStrategy,
    AuthorizeStrategy,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
