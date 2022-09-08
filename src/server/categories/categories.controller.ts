import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { configureMulter } from 'src/shared/utils/multer.helper'
import { AuthorizeGuard } from '../auth/guards/authorize.guard'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { FindMany } from './../../shared/types/database.type'
import { ImageMimeTypes } from './../../shared/utils/multer.helper'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from '../entities/categories.entity'
import { CategoriesService } from './categories.service'

@ApiTags('categories')
@UseGuards(AuthorizeGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/api')
  @UseGuards(PermissionGuard(['canAddCategories']))
  @UseInterceptors(
    FileInterceptor(
      'img',
      configureMulter({
        fileCountLimit: 1,
        fileSizeLimit: 2 * 1024 * 1024,
        acceptedMimeTypes: ImageMimeTypes,
        publicPath: 'categories',
      }),
    ),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    await this.categoriesService.create({ ...dto, img: img.path })
    return 'Created new category'
  }

  @Get('/api')
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'size', required: true, type: Number })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('size', ParseIntPipe)
    size: number,
    @Query('name') name?: string,
    @Query('id') id?: string,
  ) {
    const findData: FindMany<Category> = {
      where: {},
      skip: (page - 1) * size,
      take: size,
    }
    if (id || name) {
      findData.where = [{ id }, { name }]
    }
    return await this.categoriesService.find(findData)
  }

  @Patch('/api')
  @UseGuards(PermissionGuard(['canEditCategories']))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'img',
      configureMulter({
        fileCountLimit: 1,
        fileSizeLimit: 2 * 1024 * 1024,
        acceptedMimeTypes: ImageMimeTypes,
        publicPath: 'categories',
      }),
    ),
  )
  async update(
    @Body() dto: UpdateCategoryDto,
    @Query('id') id: string,
    @UploadedFile() img: Express.Multer.File,
  ) {
    if (!id) throw new BadRequestException('Can not modify category without id')
    const category = await this.categoriesService.findOne({ id })
    if (!category) throw new BadRequestException('No category with this id')
    await this.categoriesService.update(category, {
      ...dto,
      img: img?.path,
    })
    return 'Category updated '
  }

  @Delete('/api')
  @UseGuards(PermissionGuard(['canDeleteCategories']))
  async delete(@Query('id') id: string) {
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const category = await this.categoriesService.findOne({ id })
    if (!category) throw new BadRequestException('No categories with this id')
    await this.categoriesService.delete(category)
    return 'Category deleted'
  }

  @Render('categories')
  @Get()
  async categoriesPage() {}
}
