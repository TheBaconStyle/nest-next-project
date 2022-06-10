import { RolesAPIController } from './roles-api.controller'
import { Role } from './entities/roles.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesService } from './../auth/services/roles.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesAPIController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
