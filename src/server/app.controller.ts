import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { UsersService } from './../../example/users.service'
import { BookingsService } from './bookings/bookings.service'
import { CategoriesService } from './categories/categories.service'
import { FacilitiesService } from './facilities/facilities.service'
import { RolesService } from './roles/roles.service'

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly facilitiesService: FacilitiesService,
    private readonly categoriesService: CategoriesService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  // @Render('index')
  async home() {
    return
  }

  @Get('account')
  // @UseGuards(AuthorizeGuard)
  // @Render('account')
  protectedRoute() {
    // return 'udhaiuhwdhadhwa'
  }
}
