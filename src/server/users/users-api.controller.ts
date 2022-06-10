import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/api/users')
@ApiTags('users')
export class UsersAPIController {}