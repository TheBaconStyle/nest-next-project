import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('api/facilities')
@ApiTags('facilities')
export class FacilitiesAPIController {}
