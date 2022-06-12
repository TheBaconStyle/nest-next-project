import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { NextFunction } from 'express'
import { havePermissions } from 'src/server/shared/utils/identify-permissions.helper'
import { User } from 'src/server/users/entities/users.entity'
import { FindBookDto } from '../dto/find-book.dto'
import { AuthorizedGuard } from './../../auth/guards/authorize.guard'
import { ReqUser } from './../../shared/decorators/user.decorator'
import { FindPageDto } from './../../shared/types/find-page.type'
import { BookingsService } from './../bookings.service'
import { CreateBookDto } from './../dto/create-book.dto'

@Controller('/api/bookings')
@UseGuards(AuthorizedGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBook(@Body() dto: CreateBookDto, @ReqUser() user: User) {
    const book = await this.bookingsService.create({
      from: new Date(dto.from),
      to: new Date(dto.to),
      user,
    })
    return `created book on ${book.from.toDateString()}`
  }

  @Get()
  async getDashboardBooks(
    @ReqUser() user: User,
    @Body() { facilityId, page, pageSize }: FindPageDto & FindBookDto,
    @Next() next: NextFunction,
  ) {
    const pass = await havePermissions(user, {
      haveDashboardAccess: true,
      haveBookingsAccess: true,
    })
    if (!pass) return next()
    if (facilityId) return this.bookingsService.findByFacility(facilityId)
    return this.bookingsService.findForDashboard({ page, pageSize })
  }

  @Get()
  async getUserBooks() {
    return 'OK'
  }

  @Delete()
  async cancelBook(@ReqUser() user: User, @Body() body: { id: string }) {}
}
