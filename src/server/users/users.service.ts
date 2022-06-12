import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindUserDto } from 'src/server/users/dto/find-user.dto'
import { Repository } from 'typeorm'
import { RegisterDto } from '../auth/dto/register-user.dto'
import { User } from './entities/users.entity'
import { Role } from '../roles/entities/roles.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(registerUserDto: RegisterDto) {
    const user = new User(registerUserDto)
    return await this.userRepo.save(user)
  }

  async findOne(whereConditions: FindUserDto) {
    const user = await this.userRepo.findOne({
      where: whereConditions,
      relations: ['roles'],
    })
    return user
  }

  async find(whereConditions: FindUserDto[]) {
    return await this.userRepo.find({
      where: whereConditions,
      relations: ['roles'],
    })
  }

  async delete(users: User[]) {
    return await this.userRepo.softRemove(users)
  }

  async createRootUser(rootRole: Role) {
    const variant = await this.userRepo.findOne({ login: 'root' })
    if (variant) return variant
    const rootUser = new User({
      login: 'root',
      password: this.configService.get('ROOT_PASSWORD'),
    })
    rootUser.roles = [rootRole]
    return await this.userRepo.save(rootUser)
  }
}
