import { Controller, Get } from '@nestjs/common'
<<<<<<< HEAD
import { ConfigService } from '@nestjs/config'
import { ApiExcludeController } from '@nestjs/swagger'
import { UsersService } from './users/users.service'
=======
import { ApiExcludeController } from '@nestjs/swagger'
import { UsersService } from './../../example/users.service'
import { BookingsService } from './bookings/bookings.service'
import { CategoriesService } from './categories/categories.service'
import { FacilitiesService } from './facilities/facilities.service'
import { RolesService } from './roles/roles.service'
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(
<<<<<<< HEAD
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async home() {
    return
=======
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
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }
}
