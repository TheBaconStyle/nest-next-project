import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { FingerprintData } from '@shwao/express-fingerprint'
import { RegisterDto } from '../dto/register-user.dto'
import { SignInDto } from '../dto/signin-user.dto'
import { SessionsService } from './sessions.service'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  async registerUser(userDto: RegisterDto) {
    const { email, login } = userDto
    const candidate = await this.usersService.find([{ email }, { login }])
    if (candidate.length > 0)
      throw new BadRequestException(
        'User with this email/login already exists.',
      )
    const user = await this.usersService.create(userDto).catch(() => false)
    if (user) return user
    throw new InternalServerErrorException(
      'Oops! Error while registering user.',
    )
  }

  async authenticateUser(
    { email, password }: SignInDto,
    fingerprint: FingerprintData,
  ) {
    const candidate = await this.usersService.findOne({ email }).catch(() => {
      throw new UnauthorizedException('User with this email is not exist.')
    })
    const isPasswordValid = await candidate.validatePassword(password)
    if (candidate && isPasswordValid) {
      const useragent = fingerprint.components.useragent
      return await this.sessionsService.create({
        user: candidate,
        hash: fingerprint.hash,
        name: `${useragent.browser.family}, ${useragent.os.family}`,
      })
    }
    throw new UnauthorizedException(
      'Oops! Login & password combination is not valid!',
    )
  }

  async authorizeUser(hash: string) {
    const session = await this.sessionsService.findOne(hash).catch(() => {
      throw new InternalServerErrorException('User was not found.')
    })
    return session.user
  }

  async deauthenticateUser(hash: string) {
    return await this.sessionsService.delete(hash)
  }
}
