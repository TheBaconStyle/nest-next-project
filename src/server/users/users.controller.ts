import { Controller, Get, Render, UseGuards } from '@nestjs/common'
import { AuthorizeGuard } from '../auth/guards/authorize.guard'
import { CurrentUser } from '../decorators/request-user.decorator'
import { User } from '../entities/users.entity'

@UseGuards(AuthorizeGuard)
@Controller('user')
export class UsersController {
  @Render('profile')
  @Get('profile')
  async qwe(@CurrentUser() user: User) {
    return {
      user: user.login,
    }
  }
}
