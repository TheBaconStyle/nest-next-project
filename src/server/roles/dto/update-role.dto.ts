import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priority?: number

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveDashboardAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveDocsAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveCategoriesAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddCategories?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canEditCategories?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteCategories?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveFacilitiesAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddFacilities?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canEditFacilities?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteFacilities?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveRolesAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddRoles?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canEditRoles?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteRoles?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveUsersAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddUsers?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canEditUsers?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteUsers?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveBookingsAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddBookings?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteBookings?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  haveArticlesAccess?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canAddArticles?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canEditArticles?: boolean

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDeleteArticles?: boolean
}
