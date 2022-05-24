import { Session } from './entities/session.entity'
import { CreateRoleDto } from '../roles/dto/create.dto'
import { RolesService } from './../roles/roles.service'
import { LoginUserDto } from './../users/dto/signin.dto'
import { RegisterUserDto } from 'src/server/users/dto/register.dto'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/users.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async registerUser(userDto: RegisterUserDto) {
    const { email, login } = userDto
    const candidate = await this.usersService.findOne([{ email }, { login }])
    if (candidate)
      throw new BadRequestException(
        'User with this email/login already exists.',
      )
    const user = await this.usersService.create(userDto)
    if (user) return user
    throw new InternalServerErrorException(
      'Oops! Error while registering user.',
    )
  }

  async authenticateUser({ email, password }: LoginUserDto) {
    const candidate = await this.usersService.findOne([{ email }]).catch(() => {
      throw new UnauthorizedException('User with this email is not exist.')
    })
    const isPasswordValid = await compare(password, candidate.password)
    if (candidate && isPasswordValid) {
      const tokens = await this.generateTokens(candidate).catch(() => {
        throw new InternalServerErrorException('Unable generate tokens.')
      })
      return tokens
    }
    throw new UnauthorizedException(
      'Oops! Login & password combination is not valid!',
    )
  }

  async authorizeUser(token: string) {
    const { user: login } = await this.jwtService
      .verifyAsync(token)
      .catch(() => {
        throw new UnauthorizedException('Token is not valid.')
      })
    return await this.usersService.findOne([{ login }]).catch(() => {
      throw new InternalServerErrorException('User was not found.')
    })
  }

  async refreshUser(token: string) {
    const { user: id } = await this.jwtService.verifyAsync(token).catch(() => {
      throw new UnauthorizedException('Token is not valid.')
    })
    const user = await this.usersService.findOne([{ id }]).catch(() => {
      throw new InternalServerErrorException('User was not found.')
    })
    return await this.generateTokens(user).catch(() => {
      throw new InternalServerErrorException('Unable generate tokens.')
    })
  }

  async createRole(roleDto: CreateRoleDto) {
    return this.rolesService.create(roleDto).catch(() => {
      throw new BadRequestException()
    })
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
  checkRefreshToken(token: string) {
    try {
      this.jwtService.verify(token)
      return true
    } catch {
      return false
    }
  }
  // private async logToSession(user: User, token: string) {
  //   const session = new Session()
  //   session.token =
  // }
}
