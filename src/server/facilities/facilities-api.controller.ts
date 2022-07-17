import { AuthorizeGuard } from './../auth/guards/authorize.guard'
import { FacilitiesService } from './facilities.service'
import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PermissionGuard } from '../auth/guards/permission.guard'

@Controller('api/facilities')
@ApiTags('facilities')
@UseGuards(AuthorizeGuard)
export class FacilitiesAPIController {
  constructor(private readonly facilitiesService: FacilitiesService) {}
  @Post()
  @UseGuards(PermissionGuard(['canAddFacilities']))
  async crate() {}

  @Get()
  async get() {}

  @Patch()
  @UseGuards(PermissionGuard(['canEditFacilities']))
  async update() {}

  @Delete()
  @UseGuards(PermissionGuard(['canDeleteFacilities']))
  async delete() {}
}
