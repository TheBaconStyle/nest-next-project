import { Injectable } from '@nestjs/common'
import { UserService } from '../user/users.service'
// import { User } from '../user/users.model'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
