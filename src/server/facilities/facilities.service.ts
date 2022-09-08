import { createPublicDestination } from 'src/shared/utils/multer.helper'
import {
  FindMany,
  FindOne,
  OneOrMany,
  PartialFields,
  RequiredFields,
} from './../../shared/types/database.type'
import { Facility } from '../entities/facilities.entity'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { basename, join } from 'path'
import { unlink } from 'fs/promises'

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
    const variant = await this.findOne({
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
    return await this.facilitiesRepo.findOne({ where: findData })
  }

  async find(findData: FindMany<Facility>) {
    const result = await this.facilitiesRepo.find({
      ...findData,
      order: { name: 'ASC' },
    })
    return result
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

  async delete(facilities: OneOrMany<Facility>) {
    const variants: Facility[] = []
    if (Array.isArray(facilities)) {
      variants.push(...facilities)
    } else {
      variants.push(facilities)
    }
    return await this.facilitiesRepo.softRemove(variants)
  }
}
