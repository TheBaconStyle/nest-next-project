import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('api/roles')
@ApiTags('roles')
export class RolesAPIController {}
