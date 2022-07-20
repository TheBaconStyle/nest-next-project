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
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { NextFunction, Response } from 'express'
import { PermissionGuard } from '../auth/guards/permission.guard'
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
  async crate(
    @Body() dto: CreateFacilityDto,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    // const category = this.categoriesService.findOne({ id: dto.category })
    // if (!category)
    //   throw new BadRequestException('Category with this id does not exists')
    // const img = basename(dto.img.path)
    // await this.facilitiesService
    //   .create({ ...dto, category, img })
    //   .catch((err) => next(err))
    return 'Created new facility'
  }

  @Get()
  async get(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('size', ParseIntPipe)
    size: number,
    @Query('name') name?: string,
    @Query('id') id?: string,
  ) {
    if (!id || !name) {
      return await this.facilitiesService.find(
        {},
        { skip: (page - 1) * size, take: size },
      )
    }
    return await this.facilitiesService.find([{ id }, { name }], {
      skip: (page - 1) * size,
      take: size,
    })
  }

  @Patch()
  @UseFilters(new HttpErrorFilter())
  @UseGuards(PermissionGuard(['canEditFacilities']))
  @ApiConsumes('multipart/form-data')
  async update(
    @Body() dto: UpdateFacilityDto,
    @Query('id') id: string,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {}

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
