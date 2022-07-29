<<<<<<< HEAD
import { Controller, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthorizeGuard } from '../auth/guards/authorize.guard'
import { PermissionGuard } from '../auth/guards/permission.guard'

@Controller('/api/users')
@ApiTags('users')
@UseGuards(AuthorizeGuard, PermissionGuard(['haveUsersAccess']))
=======
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/api/users')
@ApiTags('users')
// @UseGuards(AuthorizeGuard, PermissionGuard(['haveUsersAccess']))
>>>>>>> 4862632d8b63953f2afe5f11fa87376f9ffbe1fb
export class UsersAPIController {}
