import {
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
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
<<<<<<< HEAD
import { unlink } from 'fs/promises'
import { PermissionGuard } from '../auth/guards/permission.guard'
import { FindMany } from '../shared/types'
=======
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
import { configureMulter, ImageMimeTypes } from '../shared/utils/multer.helper'
import { CategoriesService } from './../categories/categories.service'
import { HttpErrorFilter } from './../shared/interceptors/error.filter'
import { CreateFacilityDto } from './dto/create-facility.dto'
import { UpdateFacilityDto } from './dto/update-facility.dto'
import { Facility } from './entities/facilities.entity'
import { FacilitiesService } from './facilities.service'

@Controller('api/facilities')
@ApiTags('facilities')
// @UseGuards(AuthorizeGuard)
export class FacilitiesAPIController {
  constructor(
    private readonly facilitiesService: FacilitiesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  // @UseGuards(PermissionGuard(['canAddFacilities']))
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
    // const category = this.categoriesService.findOne({ id: dto.category })
    // if (!(await category)) {
    //   await unlink(img.path)
    //   throw new BadRequestException('Category with this id does not exists')
    // }
    // const facility = await this.facilitiesService.findOne({ name: dto.name })
    // if (facility) {
    //   throw new BadRequestException('Facility with this name already exists')
    // }
    // await this.facilitiesService.create({ ...dto, category, img: img.path })
    return 'Created new facility'
  }

  @Get()
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
<<<<<<< HEAD
    const findData: FindMany<Facility> = {
      where: {},
      skip: (page - 1) * size,
      take: size,
    }
    if (id || name || category) {
      findData.where = [{ id }, { name }, { category: { id: category } }]
    }
    return await this.facilitiesService.find(findData)
=======
    // if (!id && !name && !category) {
    //   return await this.facilitiesService.find(
    //     {},
    //     { skip: (page - 1) * size, take: size },
    //   )
    // }
    // const findByCategory = { category: null }
    // if (category) {
    //   const findCategory = await this.categoriesService.findOne({
    //     id: category,
    //   })
    //   findByCategory.category = findCategory
    // }
    // const result = await this.facilitiesService.find(
    //   [{ id }, { name }, findByCategory],
    //   { skip: (page - 1) * size, take: size },
    // )
    // return result
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  @Patch()
  @UseFilters(new HttpErrorFilter())
  // @UseGuards(PermissionGuard(['canEditFacilities']))
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
    // if (!id) throw new BadRequestException('Can not modify facility without id')
    // const facility = await this.facilitiesService.findOne({ id })
    // if (!facility) throw new BadRequestException('No facility with this id')
    // const updateData = { ...dto, img: img?.path, category: facility.category }
    // if (dto.category) {
    //   const category = this.categoriesService.findOne({ id: dto.category })
    //   if (!(await category)) {
    //     await unlink(img.path)
    //     throw new BadRequestException('No category with this id')
    //   }
    //   updateData.category = category
    //   console.log((await updateData.category).id)
    // }
    // await this.facilitiesService.update(facility, updateData)
    return 'Updated facility'
  }

  @Delete()
  // @UseGuards(PermissionGuard(['canDeleteFacilities']))
  async delete(@Query('id') id: string) {
<<<<<<< HEAD
    if (!id)
      throw new BadRequestException(
        'can not delete category without category id',
      )
    const facility = await this.facilitiesService.findOne({ id })
    if (!facility) throw new BadRequestException('no facility with this id')
    await this.facilitiesService.delete(facility)
=======
    // if (!id)
    //   throw new BadRequestException(
    //     'can not delete category without category id',
    //   )
    // const facility = await this.facilitiesService.findOne({ id })
    // if (!facility) throw new BadRequestException('no facility with this id')
    // await this.facilitiesService.delete([facility])
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
    return 'Facility deleted'
  }
}
