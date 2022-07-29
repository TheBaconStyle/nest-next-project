import { Controller, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthorizeGuard } from '../auth/guards/authorize.guard'
import { PermissionGuard } from '../auth/guards/permission.guard'

@Controller('/api/users')
@ApiTags('users')
@UseGuards(AuthorizeGuard, PermissionGuard(['haveUsersAccess']))
export class UsersAPIController {}
