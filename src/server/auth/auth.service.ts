import { Session } from '../entities/sessions.entity'
import { RolesService } from './../roles/roles.service'
import { UsersService } from './../users/users.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  FindMany,
  FindOne,
  OneOrMany,
  RequiredFields,
} from 'src/shared/types/database.type'
import { User } from '../entities/users.entity'
import { FingerprintData } from '@shwao/express-fingerprint'
import { UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async createSession(
    sessionDto: RequiredFields<Session, 'hash' | 'name' | 'user'>,
  ) {
    const session = new Session(sessionDto)
    return await this.sessionRepo.save(session)
  }

  async findSession(findData: FindOne<Session>) {
    return await this.sessionRepo.findOne({
      where: findData,
      relations: { user: { roles: true } },
    })
  }
  async findSessions(findData: FindMany<Session>) {
    return await this.sessionRepo.find({
      ...findData,
    })
  }

  async updateSessions(hash: string, opts: Partial<Session>) {
    return await this.sessionRepo.update({ hash }, opts)
  }

  async deleteSessions(sessions: OneOrMany<Session>) {
    const variants: Session[] = []
    if (Array.isArray(sessions)) {
      variants.push(...sessions)
    } else {
      variants.push(sessions)
    }
    return await this.sessionRepo.remove(variants)
  }

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
      return await this.createSession({
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
    const session = await this.findSession({ hash })
    if (!session) {
      throw new UnauthorizedException()
    }
    return session.user
  }

  async deauthenticateUser(hash: string) {
    const session = await this.findSession({ hash })
    return await this.deleteSessions(session)
  }
}
