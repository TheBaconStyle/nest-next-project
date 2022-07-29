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
import isBetweeen from 'dayjs/plugin/isBetween'
import { ReqUser } from 'src/server/shared/decorators/user-from-request.decorator'
import { User } from 'src/server/users/entities/users.entity'
import { Equal, IsNull, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm'
import { BookingsService } from '../bookings.service'
import { CreateBookDto } from '../dto/create-book.dto'
import { AuthorizeGuard } from './../../auth/guards/authorize.guard'
import { FacilitiesService } from './../../facilities/facilities.service'
import { FindMany } from './../../shared/types/index'
import { Booking } from './../entities/bookings.entity'

dayjs.extend(isBetweeen)

@Controller('/api/bookings')
// @UseGuards(AuthorizeGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly facilitiesService: FacilitiesService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() { facility, from, to }: CreateBookDto,
    @ReqUser() user: User,
  ) {
<<<<<<< HEAD
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
=======
    // const facilityVariant = this.facilitiesService.findOne({
    //   id: facility,
    // })
    // if (!(await facilityVariant)) {
    //   throw new BadRequestException('No facility with this id')
    // }
    // await this.bookingsService.create({
    //   facility: facilityVariant,
    //   user: Promise.resolve(user),
    //   from,
    //   to,
    // })
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
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
    @ReqUser() user: User,
  ) {
<<<<<<< HEAD
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
=======
    // const findData = {
    //   facility: Not(IsNull()),
    //   user: Not(IsNull()),
    //   from: MoreThanOrEqual(DateToSQLite(dayjs(date).startOf('day'))),
    //   to: LessThanOrEqual(DateToSQLite(dayjs(date).endOf('day'))),
    // }
    // if (facilityId) {
    //   const facility = await this.facilitiesService.findOne({
    //     id: facilityId,
    //   })
    //   if (!facility) throw new BadRequestException('No facility with this id')
    //   findData.facility = Equal(facility)
    // }
    // if (forOwner) {
    //   findData.user = Equal(user)
    // }
    // return await this.bookingsService.find(
    //   {
    //     ...findData,
    //   },
    //   {
    //     skip: (page - 1) * size,
    //     take: size,
    //   },
    // )
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  @Delete()
  async cancel(@Query('id') id: string) {
<<<<<<< HEAD
    if (!id) throw new BadRequestException('Can not delete booking without id')
    const booking = await this.bookingsService.findOne({ id })
    if (!booking) throw new BadRequestException('No booking with this id')
    await this.bookingsService.delete(booking)
=======
    // if (!id) throw new BadRequestException('Can not delete booking without id')
    // const booking = await this.bookingsService.findOne({ id })
    // if (!booking) throw new BadRequestException('No booking with this id')
    // await this.bookingsService.delete([booking])
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
    return 'Booking deleted'
  }
}
