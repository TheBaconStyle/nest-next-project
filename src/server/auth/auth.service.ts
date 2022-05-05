import { Injectable } from '@nestjs/common'
import { User, UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
