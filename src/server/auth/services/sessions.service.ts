import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Session } from '../entities/sessions.entity'
import { RequiredFields } from './../../shared/types/index'
import { UpdateSessionDto } from './../dto/update-session.dto'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(sessionDto: RequiredFields<Session, 'hash' | 'name' | 'user'>) {
    // const session = new Session(sessionDto)
    // return await this.sessionRepo.save([session])
  }

  async findOne(sessionDto: FindOneOptions<Session>['where']) {
    // return await this.sessionRepo.findOne({
    //   where: sessionDto,
    //   relations: ['user', 'user.roles'],
    // })
  }

  async find(sessionDtos: FindManyOptions<Session>['where']) {
    // return await this.sessionRepo.find({
    //   where: sessionDtos,
    // })
  }

  async delete(session: Session) {
    // return await this.sessionRepo.remove([session])
  }

  async update(hash: string, opts: Partial<UpdateSessionDto>) {
    // return await this.sessionRepo.update({ hash }, opts)
  }
}
