import { Controller, Get, Render } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { CurrentUser } from './decorators/request-user.decorator'
import { User } from './entities/users.entity'

@ApiExcludeController()
@Controller()
export class AppController {
  @Render('home')
  @Get()
  getHello(@CurrentUser() user: User) {
    return {
      user: user ? user.login : null,
    }
  }
}
