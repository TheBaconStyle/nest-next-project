import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
<<<<<<< HEAD
import { unlink } from 'fs/promises'
import { basename, join } from 'path'
import { Repository } from 'typeorm'
import { createPublicDestination } from '../shared/utils/multer.helper'
import {
  FindMany,
  FindOne,
  OneOrMany,
  PartialFields,
  RequiredFields,
} from './../shared/types/index'
=======
import { FindOneOptions, Repository } from 'typeorm'
import { PartialFields, RequiredFields } from './../shared/types/index'
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
import { Category } from './entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}
  async create(createData: RequiredFields<Category, 'name' | 'img'>) {
<<<<<<< HEAD
    const variant = await this.findOne({ name: createData.name })
    if (variant) {
      await unlink(createData.img)
      throw new BadRequestException('Category with this name already exists')
    }
    const img = basename(createData.img)
    const category = new Category({ ...createData, img })
    return await this.categoriesRepo.save(category)
  }

  async findOne(findData: FindOne<Category>) {
    return await this.categoriesRepo.findOne({ where: findData })
  }

  async find(findData: FindMany<Category>) {
    return await this.categoriesRepo.find({
      ...findData,
      order: { name: 'ASC' },
    })
=======
    // const variant = await this.categoriesRepo.findOne({
    //   where: {
    //     name: createData.name,
    //   },
    // })
    // if (variant) {
    //   await unlink(createData.img)
    //   throw new BadRequestException('Category with this name already exists')
    // }
    // const img = basename(createData.img)
    // const category = new Category({ ...createData, img })
    // return await this.categoriesRepo.save(category)
  }

  async findOne(findData: FindOneOptions<Category>['where']) {
    // return await this.categoriesRepo.findOne({ where: findData })
  }

  async find(findData) {
    // return await this.categoriesRepo.find({
    //   where: findData,
    //   ...pageOptions,
    //   order: { name: 'ASC' },
    // })
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }

  async update(
    category: Category,
    updateData: PartialFields<Category, 'name' | 'img'>,
  ) {
    // if (updateData.img) {
    //   await unlink(
    //     join(createPublicDestination('categories'), category.img),
    //   ).catch((e) => console.log(e))
    //   updateData.img = basename(updateData.img)
    // }
    // Object.assign(category, updateData)
    // return await this.categoriesRepo.save(category)
  }

<<<<<<< HEAD
  async delete(categories: OneOrMany<Category>) {
    const variants: Category[] = []
    if (Array.isArray(categories)) {
      variants.push(...categories)
    } else {
      variants.push(categories)
    }
    return await this.categoriesRepo.softRemove(variants)
=======
  async delete(categories: Category[]) {
    // return await this.categoriesRepo.softRemove(categories)
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }
}
