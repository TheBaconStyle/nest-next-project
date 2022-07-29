import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../roles/entities/roles.entity'
import { FindMany, FindOne, OneOrMany } from './../shared/types'
import { RequiredFields } from './../shared/types/index'
import { User } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    dto: RequiredFields<User, 'login' | 'email' | 'password' | 'roles'>,
  ) {
    // const { email, login } = dto
    // const candidate = await this.userRepo.findOne({
    //   where: [{ email }, { login }],
    // })
    // if (candidate)
    //   throw new BadRequestException(
    //     'User with this email/login already exists.',
    //   )
    // const user = new User({ ...dto, roles: Promise.resolve(dto.roles) })
    // return await this.userRepo.save(user)
  }

<<<<<<< HEAD
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
=======
  async findOne(whereConditions: FindOne<User>) {
    // const user = await this.userRepo.findOne({
    //   where: whereConditions,
    //   relations: ['roles'],
    // })
    // return user
  }

  async find(whereConditions: FindMany<User>) {
    // return await this.userRepo.find({
    //   where: whereConditions,
    //   relations: ['roles'],
    // })
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  async findBlocked(findData: FindMany<User>) {
    return this.userRepo.find({ ...findData, withDeleted: true })
  }

<<<<<<< HEAD
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
=======
  async block(users: User[]) {
    // return await this.userRepo.softRemove(users)
  }

  async createRootUser(rootRole: Role) {
    // const variant = await this.userRepo.findOne({ login: 'root' })
    // if (variant) return variant
    // const rootUser = new User({
    //   email: '',
    //   login: 'root',
    //   password: this.configService.get('ROOT_PASSWORD'),
    //   roles: Promise.resolve([rootRole]),
    // })
    // console.log('created root user')
    // return await this.userRepo.save(rootUser)
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }
}
