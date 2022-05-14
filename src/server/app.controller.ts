import { Controller, Get, Param, Render } from '@nestjs/common'

@Controller()
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
