import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/roles.entity'
import { RolesAPIController } from './roles-api.controller'
import { RolesService } from './roles.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesAPIController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
