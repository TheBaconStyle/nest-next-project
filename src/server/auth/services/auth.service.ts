import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UsersService } from '../../users/services/users.service'
import { User } from '../../users/entities/users.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(newUserData: User) {
    const candidate = await this.usersService.findByData(newUserData)
    if (!candidate) await this.usersService.create(newUserData)
    return undefined
  }

  async authenticateUser(userData: User) {
    const candidate = await this.usersService.findByEmail(userData.email)
    const isPasswordValid = await compare(userData.password, candidate.password)
    if (candidate && isPasswordValid) {
      return this.generateTokens(candidate)
    }
    return undefined
  }

  async authorizeUser(token: string) {
    const { user: userData } = await this.jwtService.verify(token)
    if (userData) {
      const user = await this.usersService.findByLogin(userData)
      if (user) return user
    }
    return undefined
  }

  async refreshUser(token: string) {
    const { user: userData } = this.jwtService.verify(token)
    if (userData) {
      const user = await this.usersService.findById(userData)
      if (user) return this.generateTokens(user)
    }
    return undefined
  }

  private async generateTokens(user: User) {
    return {
      accessToken: this.jwtService.sign(
        { user: user.login },
        { secret: this.configService.get('JWT_SECRET'), expiresIn: '15m' },
      ),
      refreshToken: this.jwtService.sign({ user: user.id }),
    }
  }
}
