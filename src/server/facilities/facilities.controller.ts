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
import { unlink } from 'fs/promises'
import { configureMulter } from 'src/shared/utils/multer.helper'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { CategoriesService } from '../categories/categories.service'
import { FindMany } from './../../shared/types/database.type'
import { ImageMimeTypes } from './../../shared/utils/multer.helper'
import { CreateFacilityDto } from './dto/create-facility.dto'
import { UpdateFacilityDto } from './dto/update-facility.dto'
import { Facility } from '../entities/facilities.entity'
import { FacilitiesService } from './facilities.service'

@ApiTags('facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(
    private readonly facilitiesService: FacilitiesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('/api')
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
  @ApiConsumes('multipart/form-data')
  async crate(
    @Body() dto: CreateFacilityDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    const category = this.categoriesService.findOne({ id: dto.category })
    if (!(await category)) {
      await unlink(img.path)
      throw new BadRequestException('Category with this id does not exists')
    }
    const facility = await this.facilitiesService.findOne({ name: dto.name })
    if (facility) {
      throw new BadRequestException('Facility with this name already exists')
    }
    await this.facilitiesService.create({ ...dto, category, img: img.path })
    return 'Created new facility'
  }

  @Get('/api')
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
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
    @Query('category') category?: string,
  ) {
    const findData: FindMany<Facility> = {
      where: {},
      skip: (page - 1) * size,
      take: size,
    }
    if (id || name || category) {
      findData.where = [{ id }, { name }, { category: { id: category } }]
    }
    return await this.facilitiesService.find(findData)
  }

  @Patch('/api')
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
      if (!(await category)) {
        await unlink(img.path)
        throw new BadRequestException('No category with this id')
      }
      updateData.category = category
      console.log((await updateData.category).id)
    }
    await this.facilitiesService.update(facility, updateData)
    return 'Updated facility'
  }

  @Delete('/api')
  @UseGuards(PermissionGuard(['canDeleteFacilities']))
  async delete(@Query('id') id: string) {
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const facility = await this.facilitiesService.findOne({ id })
    if (!facility) throw new BadRequestException('no facility with this id')
    await this.facilitiesService.delete(facility)
    return 'Facility deleted'
  }

  @Render('facilities/facilities')
  @Get()
  async ewq() {}
}
