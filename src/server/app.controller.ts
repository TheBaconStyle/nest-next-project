import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { AuthorizeGuard } from './auth/guards/authorize.guard'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  async home() {
    return {}
  }

  @Get('account')
  @UseGuards(AuthorizeGuard)
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }
}
