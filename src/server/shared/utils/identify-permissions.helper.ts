import { User } from 'src/server/users/entities/users.entity'

export interface RolePermissions {
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

export async function havePermissions(
  user: User,
  permissions: RolePermissions,
) {
  console.log(user)
  return Object.entries(permissions).every(([key, value]) => {
    return user.roles.some((role) => role[key] === value)
  })
}
