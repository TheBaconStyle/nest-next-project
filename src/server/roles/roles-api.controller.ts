import { PageOptions } from '../shared/types/page.dto'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { RolesService } from './roles.service'
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
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoleDto } from './dto/create-role.dto'
import { RoleGuard } from '../auth/guards/role.guard'

@Controller('api/roles')
@UseGuards(
  AuthorizeGuard,
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

  @Get()
  async getPage(
    @Query(ValidationPipe)
    pageOptions: PageOptions,
  ) {
    return
  }

  @Get(':id?')
  async getOne() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
