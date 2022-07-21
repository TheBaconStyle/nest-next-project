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
import { configureMulter, ImageMimeTypes } from '../shared/utils/multer.helper'
import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { CategoriesService } from './../categories/categories.service'
import { HttpErrorFilter } from './../shared/interceptors/error.filter'
import { CreateFacilityDto } from './dto/create-facility.dto'
import { UpdateFacilityDto } from './dto/update-facility.dto'
import { FacilitiesService } from './facilities.service'

@Controller('api/facilities')
@ApiTags('facilities')
@ApiConsumes('multipart/form-data')
@UseGuards(AuthorizeGuard)
export class FacilitiesAPIController {
  constructor(
    private readonly facilitiesService: FacilitiesService,
    private readonly categoriesService: CategoriesService,
  ) {}
  @Post()
  @UseGuards(PermissionGuard(['canAddFacilities']))
  @UseInterceptors(
    FileInterceptor(
      'img',
      configureMulter({
        fileCountLimit: 1,
        fileSizeLimit: 2 * 1024 * 1024,
        acceptedMimeTypes: ImageMimeTypes,
        publicPath: 'facilities',
      }),
    ),
  )
  async crate(
    @Body() dto: CreateFacilityDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    const category = this.categoriesService.findOne({ id: dto.category })
    if (!category)
      throw new BadRequestException('Category with this id does not exists')
    await this.facilitiesService.create({ ...dto, category, img: img.path })
    return 'Created new facility'
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('size', ParseIntPipe)
    size: number,
    @Query('name') name?: string,
    @Query('id') id?: string,
    @Query('category') category?: string,
  ) {
    if (!id && !name && !category) {
      return await this.facilitiesService.find(
        {},
        { skip: (page - 1) * size, take: size },
      )
    }
    const findByCategory = { category: undefined }
    if (category) {
      const findCategory = this.categoriesService.findOne({ id: category })
      findByCategory.category = findCategory
    }
    return await this.facilitiesService.find(
      [{ id }, { name }, findByCategory],
      {
        skip: (page - 1) * size,
        take: size,
      },
    )
  }

  @Patch()
  @UseFilters(new HttpErrorFilter())
  @UseGuards(PermissionGuard(['canEditFacilities']))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'img',
      configureMulter({
        fileCountLimit: 1,
        fileSizeLimit: 2 * 1024 * 1024,
        acceptedMimeTypes: ImageMimeTypes,
        publicPath: 'facilities',
      }),
    ),
  )
  async update(
    @Body() dto: UpdateFacilityDto,
    @Query('id') id: string,
    @UploadedFile() img: Express.Multer.File,
  ) {
    if (!id) throw new BadRequestException('Can not modify facility without id')
    const facility = await this.facilitiesService.findOne({ id })
    if (!facility) throw new BadRequestException('No facility with this id')
    const updateData = { ...dto, img: img?.path, category: facility.category }
    if (dto.category) {
      const category = this.categoriesService.findOne({ id: dto.category })
      updateData.category = category
    }
    await this.facilitiesService.update(facility, updateData)
    return 'Updated facility'
  }

  @Delete()
  @UseGuards(PermissionGuard(['canDeleteFacilities']))
  async delete(@Query('id') id: string) {
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const facility = await this.facilitiesService.findOne({ id })
    if (!facility) throw new BadRequestException('no facility with this id')
    await this.facilitiesService.delete([facility])
    return 'Facility deleted'
  }
}
