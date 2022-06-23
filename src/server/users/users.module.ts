import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { UsersAPIController } from './users-api.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersAPIController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
