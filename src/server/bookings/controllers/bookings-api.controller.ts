import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { NextFunction } from 'express'
import { havePermissions } from 'src/server/shared/utils/identify-permissions.helper'
import { User } from 'src/server/users/entities/users.entity'
import { ReqUser } from '../../shared/decorators/user-from-request.decorator'
import { PageDto } from '../../shared/types/page.dto'
import { AuthorizeGuard } from './../../auth/guards/authorize.guard'
import { BookingsService } from './../bookings.service'
import { CreateBookDto } from './../dto/create-book.dto'

@Controller('/api/bookings')
@UseGuards(AuthorizeGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async createBookings(
    @Body() { facility: facilityId, from, to }: CreateBookDto,
    @ReqUser() user: User,
  ) {
    // const maxBookings = this.configService.get('MAX_BOOKS_PER_USER')
    // const canBook = await this.bookingsService.canBook(user, maxBookings)
    // if (!canBook)
    //   throw new BadRequestException(
    //     `You reached maximum number of bookings (${maxBookings})!`,
    //   )
    // const book = await this.bookingsService.create(
    //   {
    //     from,
    //     to,
    //     facility,
    //   },
    //   user,
    // )
    // return `booked on ${dayjs(book.from).format('DD-MM-YYYY HH:mm')}`
  }

  @Get('/:facility')
  async getForFacility(
    @Body('date') date: Date,
    @Param('facility') facilityId: string,
  ) {
    // return `${date.toISOString()} ${facilityId}`
  }

  @Get()
  async getBookings(
    @ReqUser() user: User,
    @Query() page: PageDto,
    @Next() next: NextFunction,
  ) {
    // const pass = await havePermissions(user, {
    //   haveDashboardAccess: true,
    //   haveBookingsAccess: true,
    // })
    // if (!pass) return next()
    // return this.bookingsService.findForDashboard(page.pageParams)
  }

  // @Get()
  // asyncGetBooksForUser
  @Delete()
  async cancelBook(@Body() body: { id: string }) {
    // return await this.bookingsService.deleteById(body.id)
  }
}
