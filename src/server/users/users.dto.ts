export class ValidateUserDTO {
  readonly email: string
  readonly password: string
}
export class CreateUserDTO extends ValidateUserDTO {
  readonly login: string
}
export class CheckUserExistDTO {
  readonly email: string
  readonly login: string
}
