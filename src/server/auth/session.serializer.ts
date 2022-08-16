import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '../entities/users.entity'
import { UsersService } from './../users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super()
  }
  serializeUser(user: User, done: (err: any, user: string) => void) {
    done(null, user.id)
  }
  async deserializeUser(id: string, done: (err: any, user: User) => void) {
    const user = await this.usersService.findOne({ id })
    done(null, user)
  }
}
