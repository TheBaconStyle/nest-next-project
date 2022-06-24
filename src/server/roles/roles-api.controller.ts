import { PageDto } from './../shared/types/index'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoleGuard } from '../auth/guards/role.guard'
import { PageOptions } from '../shared/types'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'

@Controller('api/roles')
@UseGuards(
  AuthorizeGuard,
  RoleGuard({ haveDashboardAccess: true, haveRolesAccess: true }),
)
@ApiTags('roles')
export class RolesAPIController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @Body()
    roleDto: CreateRoleDto,
  ) {
    await this.rolesService.create(roleDto)
    return 'New role successfully created!'
  }

  @Get()
  async getPage(
    @Query()
    pageOptions: PageDto,
  ) {
    return pageOptions
  }

  @Get(':id?')
  async getOne() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
