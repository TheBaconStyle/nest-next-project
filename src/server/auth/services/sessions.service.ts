import { UpdateSessionDto } from './../dto/update-session.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'
import { Session } from '../entities/sessions.entity'
import { FindMany, FindOne } from './../../shared/types'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(sessionDto: Partial<Session>) {
    const session = new Session(sessionDto)
    return await this.sessionRepo.save([session])
  }

  async findOne(sessionDto: FindConditions<Session>) {
    return await this.sessionRepo.findOne({
      where: sessionDto,
      relations: ['user', 'user.roles'],
    })
  }

  async find(sessionDtos: FindMany<Session>) {
    return await this.sessionRepo.find({
      where: sessionDtos,
    })
  }

  async delete(session: Session) {
    return await this.sessionRepo.remove([session])
  }

  async update(hash: string, opts: Partial<UpdateSessionDto>) {
    return await this.sessionRepo.update({ hash }, opts)
  }
}
