import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/api/users')
@ApiTags('users')
// @UseGuards(AuthorizeGuard, PermissionGuard(['haveUsersAccess']))
export class UsersAPIController {}
