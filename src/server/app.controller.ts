import { MulterHelper } from './multer.helper'
import { diskStorage } from 'multer'
import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiExcludeController } from '@nestjs/swagger'

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
  async file(@UploadedFile() file) {
    return 'OK'
  }
}
