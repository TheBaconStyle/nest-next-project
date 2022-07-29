import { Injectable, UnauthorizedException } from '@nestjs/common'
import { FingerprintData } from '@shwao/express-fingerprint'
import { User } from 'src/server/users/entities/users.entity'
import { UsersService } from '../../users/users.service'
import { RolesService } from './../../roles/roles.service'
import { RequiredFields } from './../../shared/types/index'
import { SessionsService } from './sessions.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly rolesService: RolesService,
  ) {}

  async registerUser(
    userData: RequiredFields<User, 'email' | 'login' | 'password'>,
  ) {
    const basicRole = await this.rolesService.getBasicRole()
    return await this.usersService.create({
      ...userData,
      roles: Promise.resolve([basicRole]),
    })
  }

  async authenticateUser(
    { login, password }: RequiredFields<User, 'login' | 'password'>,
    fingerprint: FingerprintData,
  ) {
    const candidate = this.usersService.findOne({ login })
    if (!(await candidate))
      throw new UnauthorizedException('User with this login does not exist.')
    if (await (await candidate).validatePassword(password)) {
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
