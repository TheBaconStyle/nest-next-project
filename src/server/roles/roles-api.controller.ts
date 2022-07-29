import { Role } from 'src/server/roles/entities/roles.entity'
import { FindMany } from './../shared/types/index'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { ReqUser } from '../shared/decorators/user-from-request.decorator'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { User } from './../users/entities/users.entity'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { RolesService } from './roles.service'

@Controller('api/roles')
@UseGuards(AuthorizeGuard, PermissionGuard(['haveRolesAccess']))
@ApiTags('roles')
export class RolesAPIController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(PermissionGuard(['canAddRoles']))
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
  @UseGuards(PermissionGuard(['canEditRoles']))
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
  @UseGuards(PermissionGuard(['canDeleteRoles']))
  async delete(@Query('id') id: string) {
    if (!id) throw new BadRequestException("Can't delete role!")
    const role = await this.rolesService.findOne({ id })
    await this.rolesService.delete(role)
    return `Deleted role`
  }
}
