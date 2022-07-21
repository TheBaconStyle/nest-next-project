import { FacilitiesService } from './../../facilities/facilities.service'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { ReqUser } from 'src/server/shared/decorators/user-from-request.decorator'
import { User } from 'src/server/users/entities/users.entity'
import { BookingsService } from '../bookings.service'
import { CreateBookDto } from '../dto/create-book.dto'
import { AuthorizeGuard } from './../../auth/guards/authorize.guard'

@Controller('/api/bookings')
@UseGuards(AuthorizeGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly configService: ConfigService,
    private readonly facilitiesService: FacilitiesService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() dto: CreateBookDto, @ReqUser() user: User) {
    const facility = await this.facilitiesService.findOne({ id: dto.facility })
    console.log(facility)
  }

  @Get()
  async get() {}

  @Delete()
  async cancel() {}
}
