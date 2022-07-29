import { UsersService } from './users/users.service'
import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { RolesService } from './roles/roles.service'

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async home() {}
}
