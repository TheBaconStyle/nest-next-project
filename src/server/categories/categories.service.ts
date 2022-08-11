import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { unlink } from 'fs/promises'
import { basename, join } from 'path'
import {
  FindMany,
  FindOne,
  OneOrMany,
  PartialFields,
  RequiredFields,
} from 'src/shared/types/database.type'
import { createPublicDestination } from 'src/shared/utils/multer.helper'
import { Repository } from 'typeorm'
import { Category } from '../entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async create(createData: RequiredFields<Category, 'name' | 'img'>) {
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

  async delete(categories: OneOrMany<Category>) {
    const variants: Category[] = []
    if (Array.isArray(categories)) {
      variants.push(...categories)
    } else {
      variants.push(categories)
    }
    return await this.categoriesRepo.softRemove(variants)
  }
}
