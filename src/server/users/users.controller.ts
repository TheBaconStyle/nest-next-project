import {Controller, UseGuards} from '@nestjs/common'
import {AuthorizeGuard} from '../auth/guards/authorize.guard'

@UseGuards(AuthorizeGuard)
@Controller('user')
export class UsersController {
}
