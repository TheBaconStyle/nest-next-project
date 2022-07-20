import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  name: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  priority?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveDashboardAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveDocsAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveCategoriesAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddCategories?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canEditCategories?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteCategories?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveFacilitiesAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddFacilities?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canEditFacilities?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteFacilities?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveRolesAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddRoles?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canEditRoles?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteRoles?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveUsersAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddUsers?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canEditUsers?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteUsers?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveBookingsAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddBookings?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteBookings?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  haveArticlesAccess?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canAddArticles?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canEditArticles?: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  canDeleteArticles?: boolean
}
