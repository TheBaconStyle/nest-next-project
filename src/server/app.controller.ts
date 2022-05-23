import { Controller, Get, Param, Render } from '@nestjs/common'

import { ApiExcludeController } from '@nestjs/swagger'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  async home() {
    return {}
  }

  @Get('/:abc')
  @Render('Qwe')
  qwe(@Param('abc') param: string) {
    return {
      title: param,
    }
  }
}
