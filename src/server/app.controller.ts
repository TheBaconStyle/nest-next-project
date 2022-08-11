import { AuthorizeGuard } from './guards/authorize.guard'
import { Controller, Get, Render, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

@ApiExcludeController()
@Controller()
export class AppController {
  @Render('Index')
  @Get()
  getHello() {}

  @Render('Profile')
  @UseGuards(AuthorizeGuard)
  @Get('profile')
  async qwe() {}

  @Render('facilities/facilities')
  @Get('new')
  async ewq() {}
}
