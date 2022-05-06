export enum Roles {
  user = 'user',
  admin = 'admin',
}

export type Role = keyof typeof Roles

export const ROLE = Symbol('role')
