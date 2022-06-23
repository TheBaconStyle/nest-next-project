import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty()
  name: string

  priority?: number

  haveDashboardAccess?: boolean

  haveDocsAccess?: boolean

  haveCategoriesAccess?: boolean

  canAddCategories?: boolean

  canEditCategories?: boolean

  canDeleteCategories?: boolean

  haveFacilitiesAccess?: boolean

  canAddFacilities?: boolean

  canEditFacilities?: boolean

  canDeleteFacilities?: boolean

  haveRolesAccess?: boolean

  canAddRoles?: boolean

  canEditRoles?: boolean

  canDeleteRoles?: boolean

  haveUsersAccess?: boolean

  canAddUsers?: boolean

  canEditUsers?: boolean

  canDeleteUsers?: boolean

  haveBookingsAccess?: boolean

  canAddBookings?: boolean

  canDeleteBookings?: boolean

  haveArticlesAccess?: boolean

  canAddArticles?: boolean

  canEditArticles?: boolean

  canDeleteArticles?: boolean
}
