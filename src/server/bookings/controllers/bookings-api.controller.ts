import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { RoleGuard } from 'src/server/auth/guards/role.guard'
import { User } from 'src/server/users/entities/users.entity'
import { AuthorizedGuard } from './../../auth/guards/authorize.guard'
import { ReqUser } from './../../shared/decorators/user.decorator'
import { BookingsService } from './../bookings.service'
import { CreateBookDto } from './../dto/create-book.dto'
import roles from '../../shared/roles/roles.json'
@Controller('/api/bookings')
@UseGuards(AuthorizedGuard)
@ApiTags('bookings')
export class BookingsAPIController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/')
  async createBook(@Body() dto: CreateBookDto, @ReqUser() user: User) {
    const book = await this.bookingsService.create({
      from: new Date(dto.from),
      to: new Date(dto.to),
      user,
    })
    return `created book on ${book.from.toDateString()}`
  }

  @Get('/')
  async getBooks(@ReqUser() user: User, @Body() body: any) {
    return { user, body }
  }

  @Delete('/')
  @UseGuards(RoleGuard(roles.ADMIN))
  async cancelBook() {}
}
