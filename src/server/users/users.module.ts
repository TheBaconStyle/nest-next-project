import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
<<<<<<< HEAD
import { Role } from './entities/roles.entity'
import { User } from './entities/users.entity'
import { UsersService } from './services/users.service'
=======
import { Role } from '../roles/entities/roles.entity'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
>>>>>>> master

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
