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
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category } from './entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}
  async create(createData: RequiredFields<Category, 'name' | 'img'>) {
    const variant = await this.categoriesRepo.findOne({ name: createData.name })
    if (variant) {
      throw new BadRequestException('Category with this name already exists')
    }
    const img = basename(createData.img)
    const category = new Category({ ...createData, img })
    return await this.categoriesRepo.save(category)
  }

  async findOne(findData: FindOne<Category>) {
    return await this.categoriesRepo.findOne(findData)
  }

  async find(findData: FindMany<Category>, pageOptions: PageOptions) {
    return await this.categoriesRepo.find({
      where: findData,
      ...pageOptions,
      order: { name: 'ASC' },
    })
  }

  async update(
    category: Category,
    updateData: PartialFields<Category, 'name' | 'img'>,
  ) {
    if (updateData.img) {
      await unlink(
        join(createPublicDestination('categories'), category.img),
      ).catch((e) => console.log(e))
      updateData.img = basename(updateData.img)
    }
    Object.assign(category, updateData)
    return await this.categoriesRepo.save(category)
  }

  async delete(categories: Category[]) {
    // await Promise.all(
    //   categories.map(async (category) => {
    //     await unlink(join(createPublicDestination('categories'), category.img))
    //   }),
    // )
    return await this.categoriesRepo.softRemove(categories)
  }
}
