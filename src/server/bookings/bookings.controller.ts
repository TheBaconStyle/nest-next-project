import { FindMany } from './../../shared/types/database.type'
import { Booking } from '../entities/bookings.entity'
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import dayjs from 'dayjs'
import { User } from 'src/server/entities/users.entity'
import { CurrentUser } from '../decorators/request-user.decorator'
import { FacilitiesService } from '../facilities/facilities.service'
import { AuthorizeGuard } from '../auth/guards/authorize.guard'
import { CreateBookDto } from './create-booking.dto'
import { BookingsService } from './bookings.service'
import { Equal, IsNull, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm'

@ApiTags('bookings')
@UseGuards(AuthorizeGuard)
@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly facilitiesService: FacilitiesService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() { facility, from, to }: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    const facilityVariant = this.facilitiesService.findOne({
      id: facility,
    })
    if (!(await facilityVariant)) {
      throw new BadRequestException('No facility with this id')
    }
    await this.bookingsService.create({
      facility: facilityVariant,
      user: Promise.resolve(user),
      from: dayjs(from).startOf('hour').toDate(),
      to: dayjs(to).startOf('hour').toDate(),
    })
    return 'Booking created'
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'date', required: false, type: Date })
  @ApiQuery({ name: 'facility', required: true, type: String })
  @ApiQuery({ name: 'owner', required: false, type: Boolean })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'size', required: true, type: Number })
  async get(
    @Query('date') date: Date,
    @Query('facility') facilityId: string,
    @Query('owner', ParseBoolPipe) forOwner: boolean,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @CurrentUser() user: User,
  ) {
    const findData: FindMany<Booking>['where'] = {
      facility: Not(IsNull()),
      user: Not(IsNull()),
      from: MoreThanOrEqual(dayjs(date).startOf('day').toDate()),
      to: LessThanOrEqual(dayjs(date).endOf('day').toDate()),
    }
    if (facilityId) {
      const facility = await this.facilitiesService.findOne({
        id: facilityId,
      })
      if (!facility) throw new BadRequestException('No facility with this id')
      findData.facility = { id: facility.id }
    }
    if (forOwner) {
      findData.user = Equal(user)
    }
    return await this.bookingsService.find({
      where: findData,
      skip: (page - 1) * size,
      take: size,
    })
  }

  @Delete()
  async cancel(@Query('id') id: string) {
    if (!id) throw new BadRequestException('Can not delete booking without id')
    const booking = await this.bookingsService.findOne({ id })
    if (!booking) throw new BadRequestException('No booking with this id')
    await this.bookingsService.delete(booking)
    return 'Booking deleted'
  }
}
