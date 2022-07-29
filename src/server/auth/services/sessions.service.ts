import {
  FindOne,
  RequiredFields,
  FindMany,
  OneOrMany,
} from './../../shared/types/index'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Session } from '../entities/sessions.entity'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(sessionDto: RequiredFields<Session, 'hash' | 'name' | 'user'>) {
    const session = new Session(sessionDto)
    return await this.sessionRepo.save(session)
  }

  async findOne(findData: FindOne<Session>) {
    return await this.sessionRepo.findOne({
      where: findData,
      relations: { user: { roles: true } },
    })
  }

  async find(findData: FindMany<Session>) {
    return await this.sessionRepo.find({
      ...findData,
    })
  }

  async delete(sessions: OneOrMany<Session>) {
    const variants: Session[] = []
    if (Array.isArray(sessions)) {
      variants.push(...sessions)
    } else {
      variants.push(sessions)
    }
    return await this.sessionRepo.remove(variants)
  }

  async update(hash: string, opts: Partial<Session>) {
    return await this.sessionRepo.update({ hash }, opts)
  }
}
