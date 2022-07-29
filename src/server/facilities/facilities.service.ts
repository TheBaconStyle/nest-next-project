import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  FindMany,
  FindOne,
<<<<<<< HEAD
  OneOrMany,
=======
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
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
<<<<<<< HEAD
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
=======
    // const variant = await this.facilitiesRepo.findOne({
    //   where: {
    //     name: createData.name,
    //   },
    // })
    // if (variant) {
    //   throw new BadRequestException('Facility with this name already exists')
    // }
    // const img = basename(createData.img)
    // const facility = new Facility({ ...createData, img })
    // return await this.facilitiesRepo.save(facility)
  }

  async findOne(findData: FindOne<Facility>) {
    // return await this.facilitiesRepo.findOne(findData)
  }

  async find(findData: FindMany<Facility>) {
    // const result = await this.facilitiesRepo.find({
    //   where: findData,
    //   ...pageOptions,
    //   order: { name: 'ASC' },
    // })
    // return result
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  async update(
    facility: Facility,
    updateData: PartialFields<
      Facility,
      'name' | 'img' | 'category' | 'description'
    >,
  ) {
    // if (updateData.img) {
    //   await unlink(
    //     join(createPublicDestination('facilities'), facility.img),
    //   ).catch((e) => console.log(e))
    //   updateData.img = basename(updateData.img)
    // }
    // Object.assign(facility, updateData)
    // return await this.facilitiesRepo.save(facility)
  }

<<<<<<< HEAD
  async delete(facilities: OneOrMany<Facility>) {
    const variants: Facility[] = []
    if (Array.isArray(facilities)) {
      variants.push(...facilities)
    } else {
      variants.push(facilities)
    }
    return await this.facilitiesRepo.softRemove(variants)
=======
  async delete(categories: Facility[]) {
    // return await this.facilitiesRepo.softRemove(categories)
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }
}
