import {Controller, Get, NotFoundException, Redirect, Render, Session, UseGuards,} from '@nestjs/common'
import {ApiExcludeController} from '@nestjs/swagger'
import {CurrentUser} from "./decorators/request-user.decorator";
import {User} from "./entities";
import {UnauthorizedGuard} from "./auth/guards/unauthorized.guard";
import {AuthorizeGuard} from "./auth/guards/authorize.guard";

@ApiExcludeController()
@Controller()
export class AppController {
  constructor() {
  }

  @Render('home')
  @Get()
  home(@CurrentUser() user: User) {
    if (user) return {user: user.login,}
  }

  @UseGuards(UnauthorizedGuard)
  @Render('signin')
  @Get('signin')
  @Redirect('/', 200)
  signin() {
  }

  @UseGuards(UnauthorizedGuard)
  @Render('signup')
  @Get('signup')
  @Redirect('/', 200)
  signup() {
  }

  @UseGuards(AuthorizeGuard)
  @Render('account')
  @Get('account')
  account(@CurrentUser() user: User) {
    if (user) return {user: user.login,}
  }

  @Get('signout')
  @Redirect('/')
  async signout(@Session() session: any) {
    if (session) await session.destroy()
  }

  @Get('qwe')
  async qwe() {
    throw new NotFoundException()
  }
}
