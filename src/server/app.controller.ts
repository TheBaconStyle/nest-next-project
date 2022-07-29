import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiExcludeController } from '@nestjs/swagger'
import { UsersService } from './users/users.service'

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async home() {
    return
  }
}
