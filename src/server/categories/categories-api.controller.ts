import { FindMany } from './../shared/types/index'
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
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { configureMulter } from '../shared/utils/multer.helper'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { HttpErrorFilter } from './../shared/interceptors/error.filter'
import { ImageMimeTypes } from './../shared/utils/multer.helper'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/categories.entity'

@Controller('api/categories')
@ApiTags('categories')
// @UseGuards(AuthorizeGuard)
export class CategoriesAPIController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  // @UseGuards(PermissionGuard(['canAddCategories']))
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
    // await this.categoriesService.create({ ...dto, img: img.path })
    return 'Created new category'
  }

  @Get()
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
<<<<<<< HEAD
    const findData: FindMany<Category> = {
      where: {},
      skip: (page - 1) * size,
      take: size,
    }
    if (id || name) {
      findData.where = [{ id }, { name }]
    }
    return await this.categoriesService.find(findData)
=======
    // if (!id && !name) {
    //   return await this.categoriesService.find(
    //     {},
    //     { skip: (page - 1) * size, take: size },
    //   )
    // }
    // return await this.categoriesService.find([{ id }, { name }], {
    //   skip: (page - 1) * size,
    //   take: size,
    // })
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  @Patch()
  @UseFilters(new HttpErrorFilter())
  // @UseGuards(PermissionGuard(['canEditCategories']))
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
<<<<<<< HEAD
    if (!id) throw new BadRequestException('Can not modify category without id')
    const category = await this.categoriesService.findOne({ id })
    if (!category) throw new BadRequestException('No category with this id')
    await this.categoriesService.update(category, {
      ...dto,
      img: img?.path,
    })
    return 'Category updated '
=======
    // if (!id) throw new BadRequestException('Can not modify category without id')
    // const category = await this.categoriesService.findOne({ id })
    // if (!category) throw new BadRequestException('No category with this id')
    // await this.categoriesService.update(category, {
    //   ...dto,
    //   img: img?.path,
    // })
    return 'Updated category'
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  @Delete()
  // @UseGuards(PermissionGuard(['canDeleteCategories']))
  async delete(@Query('id') id: string) {
<<<<<<< HEAD
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const category = await this.categoriesService.findOne({ id })
    if (!category) throw new BadRequestException('No categories with this id')
    await this.categoriesService.delete(category)
=======
    // if (!id)
    //   throw new BadRequestException(
    //     'can not delete category without category id',
    //   )
    // const category = await this.categoriesService.findOne({ id })
    // if (!category) throw new BadRequestException('No categories with this id')
    // await this.categoriesService.delete([category])
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
    return 'Category deleted'
  }
}
