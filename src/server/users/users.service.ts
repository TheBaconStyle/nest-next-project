import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../roles/entities/roles.entity'
import { FindMany, FindOne } from './../shared/types'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: Required<CreateUserDto>) {
    const { email, login } = dto
    const candidate = await this.userRepo.findOne({
      where: [{ email }, { login }],
    })
    if (candidate)
      throw new BadRequestException(
        'User with this email/login already exists.',
      )
    const user = new User(dto)
    return await this.userRepo.save(user)
  }

  async findOne(whereConditions: FindOne<User>) {
    const user = await this.userRepo.findOne({
      where: whereConditions,
      relations: ['roles'],
    })
    return user
  }

  async find(whereConditions: FindMany<User>) {
    return await this.userRepo.find({
      where: whereConditions,
      relations: ['roles'],
    })
  }

  async findBlocked() {
    return
  }

  async block(users: User[]) {
    return await this.userRepo.softRemove(users)
  }

  async createRootUser(rootRole: Role) {
    const variant = await this.userRepo.findOne({ login: 'root' })
    if (variant) return variant
    const rootUser = new User({
      email: '',
      login: 'root',
      password: this.configService.get('ROOT_PASSWORD'),
      roles: [rootRole],
    })
    return await this.userRepo.save(rootUser)
  }
}
