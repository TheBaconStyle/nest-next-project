import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSessionDto } from '../dto/create-session.dto'
import { FindSessionDto } from '../dto/find-session.dto'
import { Session } from '../entities/sessions.entity'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async create(sessionDto: CreateSessionDto) {
    const session = new Session(sessionDto)
    return await this.sessionRepo.save(session)
  }

  async findOne(hash: string) {
    return await this.sessionRepo.findOne({
      where: { hash },
      relations: ['user'],
    })
  }

  async find(sessionDtos: FindSessionDto[]) {
    return await this.sessionRepo.find({
      where: sessionDtos,
    })
  }

  async delete(hash: string) {
    return await this.sessionRepo.delete({ hash })
  }

  async update(hash: string, opts: CreateSessionDto) {
    return await this.sessionRepo.update({ hash }, opts).catch(() => {
      throw new InternalServerErrorException('Oops! Update session error!')
    })
  }
}
