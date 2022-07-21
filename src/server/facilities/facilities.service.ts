import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { unlink } from 'fs/promises'
import { basename, join } from 'path'
import { Repository } from 'typeorm'
import { createPublicDestination } from '../shared/utils/multer.helper'
import {
  FindMany,
  FindOne,
  PageOptions,
  PartialFields,
  RequiredFields,
} from './../shared/types/index'
import { Facility } from './entities/facilities.entity'

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilitiesRepo: Repository<Facility>,
  ) {}

  async create(
    createData: RequiredFields<
      Facility,
      'name' | 'img' | 'description' | 'category'
    >,
  ) {
    const variant = await this.facilitiesRepo.findOne({
      name: createData.name,
    })
    if (variant) {
      throw new BadRequestException('Facility with this name already exists')
    }
    const img = basename(createData.img)
    const facility = new Facility({ ...createData, img })
    return await this.facilitiesRepo.save(facility)
  }

  async findOne(findData: FindOne<Facility>) {
    return await this.facilitiesRepo.findOne(findData)
  }

  async find(findData: FindMany<Facility>, pageOptions: PageOptions) {
    return await this.facilitiesRepo.find({
      where: findData,
      ...pageOptions,
      order: { name: 'ASC' },
    })
  }

  async update(
    facility: Facility,
    updateData: PartialFields<
      Facility,
      'name' | 'img' | 'category' | 'description'
    >,
  ) {
    if (updateData.img) {
      await unlink(
        join(createPublicDestination('facilities'), facility.img),
      ).catch((e) => console.log(e))
      updateData.img = basename(updateData.img)
    }
    Object.assign(facility, updateData)
    return await this.facilitiesRepo.save(facility)
  }

  async delete(categories: Facility[]) {
    return await this.facilitiesRepo.softRemove(categories)
  }
}
