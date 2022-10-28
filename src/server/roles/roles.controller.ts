import {AuthorizeGuard} from '../auth/guards/authorize.guard'
import {BasicFilter} from '../filters/basic.filter'
import {Role, User} from '../entities'
import {UpdateRoleDto} from './dto/update-role.dto'
import {CreateRoleDto} from './dto/create-role.dto'
import {RolesService} from './roles.service'
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
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import {FindMany} from 'src/shared/types/database.type'
import {ApiQuery, ApiTags} from '@nestjs/swagger'
import {CurrentUser} from '../decorators/request-user.decorator'
import {PermissionGuard} from '../auth/guards/permission.guard'

@ApiTags('roles')
@UseFilters(BasicFilter)
@UseGuards(AuthorizeGuard, PermissionGuard(['haveRolesAccess']))
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Post()
  async create(
    @Body()
      roleDto: CreateRoleDto,
  ) {
    await this.rolesService.create(roleDto)
    return 'New role successfully created!'
  }

  @Get()
  @ApiQuery({name: 'name', required: false, type: String})
  @ApiQuery({name: 'id', required: false, type: String})
  @ApiQuery({name: 'page', required: true, type: Number})
  @ApiQuery({name: 'size', required: true, type: Number})
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
        {id},
      ]
    }
    return await this.rolesService.find(findData)
  }

  @Patch()
  async update(
    @Query('id') id: string,
    @Body() changes: UpdateRoleDto,
    @CurrentUser() user: User,
  ) {
    if (!id || !changes) throw new BadRequestException("Can't update role!")
    const myRoles = await user.roles
    const updatingRole = await this.rolesService.findOne({id})
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
    const role = await this.rolesService.findOne({id})
    await this.rolesService.delete(role)
    return `Deleted role`
  }
}
