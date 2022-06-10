import { User } from './entities/users.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { Module } from '@nestjs/common'
import { UsersAPIController } from './users-api.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersAPIController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
