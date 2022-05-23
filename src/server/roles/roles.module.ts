import { Role } from './entities/roles.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesService } from './roles.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
