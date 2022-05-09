import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from './../users/users.entity'
import { UsersService } from './../users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super()
  }

  serializeUser(user: User, done: (err: Error, userID: string) => void) {
    return done(null, user.id)
  }
  async deserializeUser(
    userID: string,
    done: (err: Error, user: User) => void,
  ) {
    const user = await this.userService.findByID(userID)
    return done(null, user)
  }
}
