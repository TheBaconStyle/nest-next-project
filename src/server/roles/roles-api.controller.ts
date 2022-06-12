import { AuthorizedGuard } from './../auth/guards/authorize.guard'
import { RolesService } from './roles.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleGuard } from '../auth/guards/role.guard'

@Controller('api/roles')
@UseGuards(
  AuthorizedGuard,
  RoleGuard({ haveDashboardAccess: true, haveRolesAccess: true }),
)
@ApiTags('roles')
export class RolesAPIController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roleDto: CreateRoleDto) {
    await this.rolesService.create(roleDto)
    return 'New role successfully created!'
  }
}
