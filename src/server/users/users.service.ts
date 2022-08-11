import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { User } from '../entities/users.entity'
import {
  FindMany,
  FindOne,
  OneOrMany,
  RequiredFields,
} from 'src/shared/types/database.type'
import { BadRequestException } from '@nestjs/common'
import { Role } from '../entities/roles.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    dto: RequiredFields<User, 'login' | 'email' | 'password' | 'roles'>,
  ) {
    const { email, login } = dto
    const candidate = await this.userRepo.findOne({
      where: [{ email }, { login }],
    })
    if (candidate)
      throw new BadRequestException(
        'User with this email/login already exists.',
      )
    const user = new User({ ...dto, roles: Promise.resolve(dto.roles) })
    return await this.userRepo.save(user)
  }

  async findOne(findData: FindOne<User>) {
    const user = await this.userRepo.findOne({
      where: findData,
      relations: { roles: true },
    })
    return user
  }

  async find(findData: FindMany<User>) {
    return await this.userRepo.find({
      ...findData,
      relations: ['roles'],
    })
  }

  async findBlocked(findData: FindMany<User>) {
    return this.userRepo.find({ ...findData, withDeleted: true })
  }

  async block(users: OneOrMany<User>) {
    const variants: User[] = []
    if (Array.isArray(users)) {
      variants.push(...users)
    } else {
      variants.push(users)
    }
    return await this.userRepo.softRemove(variants)
  }

  async createRootUser(rootRole: Role) {
    const variant = await this.findOne({
      roles: { id: rootRole.id },
      login: 'root',
    })
    if (variant) return variant
    const rootUser = new User({
      email: '',
      login: 'root',
      password: this.configService.get('ROOT_PASSWORD'),
      roles: Promise.resolve([rootRole]),
    })
    console.log('created root user')
    return await this.userRepo.save(rootUser)
  }
}
