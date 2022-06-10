import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiExcludeController } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { AuthorizedGuard } from './auth/guards/authorize.guard'
import { MulterHelper } from './shared/utils/multer.helper'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  async home() {
    return {}
  }

  @Post('/qwe')
  @UseInterceptors(
    FileInterceptor('qwe', {
      storage: diskStorage({
        destination: MulterHelper.createDestination('facilities'),
        filename: MulterHelper.createFileName(),
      }),
    }),
  )
  async file() {
    return 'OK'
  }

  @Get('account')
  @UseGuards(AuthorizedGuard)
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }
}
