<<<<<<< HEAD
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
<<<<<<< HEAD
=======
import { CreateSessionDto } from './../dto/create-session.dto'
=======
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { Session } from '../entities/sessions.entity'
import { RequiredFields } from './../../shared/types/index'
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
import { UpdateSessionDto } from './../dto/update-session.dto'
>>>>>>> 4862632d8b63953f2afe5f11fa87376f9ffbe1fb

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(sessionDto: RequiredFields<Session, 'hash' | 'name' | 'user'>) {
<<<<<<< HEAD
    const session = new Session(sessionDto)
    return await this.sessionRepo.save(session)
=======
    // const session = new Session(sessionDto)
    // return await this.sessionRepo.save([session])
>>>>>>> 4862632d8b63953f2afe5f11fa87376f9ffbe1fb
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

<<<<<<< HEAD
  async update(hash: string, opts: Partial<Session>) {
    return await this.sessionRepo.update({ hash }, opts)
=======
  async update(hash: string, opts: Partial<UpdateSessionDto>) {
    // return await this.sessionRepo.update({ hash }, opts)
>>>>>>> 4862632d8b63953f2afe5f11fa87376f9ffbe1fb
  }
}
