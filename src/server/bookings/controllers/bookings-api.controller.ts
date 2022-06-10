import { ReqUser } from './../../shared/decorators/user.decorator'
import { AuthorizedGuard } from './../../auth/guards/authorize.guard'
import { CreateBookDto } from './../dto/create-book.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BookingsService } from './../bookings.service'
import { User } from 'src/server/users/entities/users.entity'
import { GetPageQueryDto } from '../../shared/dto/get-page.dto'
import { RoleGuard } from 'src/server/auth/guards/role.guard'

@Controller('/api/bookings')
@UseGuards(AuthorizedGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/')
  async create(@Body() dto: CreateBookDto, @ReqUser() user: User) {
    const book = await this.bookingsService.create({
      from: new Date(dto.from),
      to: new Date(dto.to),
      user,
    })
    return `created book on ${book.from.toDateString()}`
  }

  @Get('/')
  async getUserBookings(
    @Query() pageOptions: GetPageQueryDto,
    @ReqUser() user: User,
  ) {
    return { ...pageOptions, user }
  }

  @Get('/:facId')
  async getUserBookingsById() {}

  @Get('/:facId')
  async getNotUserBookings(
    @Query() pageOptions: GetPageQueryDto,
    @Param('facId') id: string,
    @ReqUser() user: User,
  ) {
    return { ...pageOptions, id, user }
  }

  // @Get('')
  // get;

  @Delete('/')
  @UseGuards(RoleGuard('ADMIN'))
  async cancel() {}
}
