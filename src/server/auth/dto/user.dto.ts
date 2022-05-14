export class RegisterDataDto {
  email: string
  login: string
  password: string
  roles: string[]
}

export class AuthenticateDataDto {
  email: string
  password: string
}

export class UserTokensDto {
  accessToken: string
  refreshToken: string
}
