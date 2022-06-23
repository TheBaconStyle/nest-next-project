import { Injectable, UnauthorizedException } from '@nestjs/common'
import { FingerprintData } from '@shwao/express-fingerprint'
import { UsersService } from '../../users/users.service'
import { RegisterDto } from '../dto/register-user.dto'
import { SignInDto } from '../dto/signin-user.dto'
import { RolesService } from './../../roles/roles.service'
import { SessionsService } from './sessions.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly rolesService: RolesService,
  ) {}

  async registerUser(userData: Required<RegisterDto>) {
    const basicRole = await this.rolesService.getBasicRole()
    return await this.usersService.create({ ...userData, roles: [basicRole] })
  }

  async authenticateUser(
    { login, password }: Required<SignInDto>,
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
    const session = await this.sessionsService.findOne({ hash })
    if (!session) {
      throw new UnauthorizedException()
    }
    return session.user
  }

  async deauthenticateUser(hash: string) {
    const session = await this.sessionsService.findOne({ hash })
    return await this.sessionsService.delete(session)
  }
}
