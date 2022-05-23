import { Session } from './entities/session.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './../roles/entities/roles.entity'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { RolesModule } from '../roles/roles.module'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthorizeStrategy } from './strategies/authorize.strategy'

@Module({
  imports: [
    PassportModule.register({}),
    TypeOrmModule.forFeature([Role, Session]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
  ],
  providers: [AuthService, AuthorizeStrategy, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
