import { BasicFilter } from './../filters/basic.filter'
import { User } from '../entities/users.entity'
import { UpdateRoleDto } from '../dto/update-role.dto'
import { CreateRoleDto } from '../dto/create-role.dto'
import { RolesService } from './roles.service'
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  BadRequestException,
  ForbiddenException,
  Delete,
  UseFilters,
} from '@nestjs/common'
import { ParseIntPipe } from '@nestjs/common'
import { FindMany } from 'src/shared/types/database.type'
import { Role } from '../entities/roles.entity'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { ReqUser } from '../decorators/request-user.decorator'

@ApiTags('roles')
@UseFilters(BasicFilter)
@Controller('roles')
export class RolesController {
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
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'size', required: true, type: Number })
  async get(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('size', ParseIntPipe)
    size: number,
    @Query('name') name?: string,
    @Query('id') id?: string,
  ) {
    const findData: FindMany<Role> = {
      where: {},
      skip: (page - 1) * size,
      take: size,
    }
    if (id || name) {
      findData.where = [
        {
          name: name ? name.toUpperCase() : undefined,
        },
        { id },
      ]
    }
    return await this.rolesService.find(findData)
  }

  @Patch()
  async update(
    @Query('id') id: string,
    @Body() changes: UpdateRoleDto,
    @ReqUser() user: User,
  ) {
    if (!id || !changes) throw new BadRequestException("Can't update role!")
    const myRoles = await user.roles
    const updatingRole = await this.rolesService.findOne({ id })
    if (!myRoles.some((role) => role.priority < updatingRole.priority)) {
      throw new ForbiddenException('You cannot modify this role')
    }
    if (changes.name) changes.name = changes.name.toUpperCase()
    await this.rolesService.update(updatingRole.id, changes)
    return `Updated role`
  }

  @Delete()
  async delete(@Query('id') id: string) {
    if (!id) throw new BadRequestException("Can't delete role!")
    const role = await this.rolesService.findOne({ id })
    await this.rolesService.delete(role)
    return `Deleted role`
  }
}
