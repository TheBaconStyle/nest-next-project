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
import { UsersService } from '../../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  async registerUser(userDto: RegisterDto) {
    return await this.usersService.create(userDto)
  }

  async authenticateUser(
    { login, password }: SignInDto,
    fingerprint: FingerprintData,
  ) {
    const candidate = await this.usersService.findOne({ login })
    if (!candidate)
      throw new UnauthorizedException('User with this login does not exist.')
    if (await candidate.validatePassword(password)) {
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
    const session = await this.sessionsService.findOne(hash)
    if (!session) {
      throw new UnauthorizedException()
    }
    return session.user
  }

  async deauthenticateUser(hash: string) {
    return await this.sessionsService.delete(hash)
  }
}
