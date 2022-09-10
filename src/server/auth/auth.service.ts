import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RequiredFields } from 'src/shared/types/database.type'
import { Repository } from 'typeorm'
import { Session } from '../entities/sessions.entity'
import { User } from '../entities/users.entity'
import { RolesService } from './../roles/roles.service'
import { UsersService } from './../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    private readonly usersService: UsersService,
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

  async authenticateUser({
    login,
    password,
  }: RequiredFields<User, 'login' | 'password'>) {
    const candidate = await this.usersService.findOne({ login })
    if (!candidate)
      throw new UnauthorizedException('User with this login does not exist.')
    if (await candidate.validatePassword(password)) {
      return candidate
    }
    throw new UnauthorizedException(
      'Oops! Login & password combination is not valid!',
    )
  }
}
