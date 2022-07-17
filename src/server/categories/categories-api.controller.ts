import { HttpErrorFilter } from './../shared/interceptors/error.filter'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Next,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { NextFunction, Response } from 'express'
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data'
import { basename } from 'path/win32'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { createPublicDestination } from '../shared/utils/multer.helper'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('api/categories')
@ApiTags('categories')
@UseGuards(AuthorizeGuard)
export class CategoriesAPIController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(PermissionGuard(['canAddCategories']))
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({
    storage: FileSystemStoredFile,
    fileSystemStoragePath: createPublicDestination('categories'),
    autoDeleteFile: false,
  })
  async create(
    @Body() body: CreateCategoryDto,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    await this.categoriesService.create(body).catch((err) => {
      return next(err)
    })
    return res.send('Created new category')
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  async get(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('size', ParseIntPipe)
    size: number,
    @Query('name') name?: string,
    @Query('id') id?: string,
  ) {
    if (!id || !name) {
      return await this.categoriesService.find(
        {},
        { skip: (page - 1) * size, take: size },
      )
    }
    return await this.categoriesService.find([{ id }, { name }], {
      skip: (page - 1) * size,
      take: size,
    })
  }

  @Patch()
  @UseFilters(new HttpErrorFilter())
  @UseGuards(PermissionGuard(['canEditCategories']))
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({
    storage: FileSystemStoredFile,
    fileSystemStoragePath: createPublicDestination('categories'),
    autoDeleteFile: false,
  })
  async update(
    @Body() dto: UpdateCategoryDto,
    @Query('id') id: string,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    if (!id) throw new BadRequestException('can not modify category without id')
    const category = await this.categoriesService.findOne({ id })
    if (!category) {
      if (dto.img) dto.img.delete()
      return next(
        new BadRequestException('category with this id does not exist'),
      )
    }
    await this.categoriesService.update(category, {
      name: dto.name,
      img: dto.img ? basename(dto.img.path) : undefined,
    })
    return res.send('Updated category')
  }

  @Delete()
  @UseGuards(PermissionGuard(['canDeleteCategories']))
  async delete(@Query('id') id: string) {
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const category = await this.categoriesService.findOne({ id })
    if (!category) throw new BadRequestException('no categories with this id')
    await this.categoriesService.delete([category])
    return 'Category deleted'
  }
}
