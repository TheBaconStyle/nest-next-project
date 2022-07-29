import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiExcludeController } from '@nestjs/swagger'
import { BookingsService } from './bookings/bookings.service'
import { CategoriesService } from './categories/categories.service'
import { FacilitiesService } from './facilities/facilities.service'
import { RolesService } from './roles/roles.service'
import { UsersService } from './users/users.service'

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly facilitiesService: FacilitiesService,
    private readonly categoriesService: CategoriesService,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async home() {}
}
