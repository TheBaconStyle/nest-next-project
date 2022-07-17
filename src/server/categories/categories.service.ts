import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { basename } from 'path/win32'
import { Repository } from 'typeorm'
import { createPublicDestination } from '../shared/utils/multer.helper'
import { FindMany, FindOne, PageOptions } from './../shared/types/index'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category } from './entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async create(createData: CreateCategoryDto) {
    const img = basename(createData.img.path)
    const variant = await this.categoriesRepo.findOne({ name: createData.name })
    if (variant) {
      throw new BadRequestException('Category with this name already exists')
    }
    const category = new Category({ ...createData, img })
    return await this.categoriesRepo.save(category)
  }

  async findOne(findData: FindOne<Category>) {
    return await this.categoriesRepo.findOne(findData)
  }

  async find(findCategoriesDtos: FindMany<Category>, pageOptions: PageOptions) {
    return await this.categoriesRepo.find({
      where: findCategoriesDtos,
      ...pageOptions,
      order: { name: 'ASC' },
    })
  }

  async update(
    category: Category,
    updateData: Partial<Pick<Category, 'name' | 'img'>>,
  ) {
    if (updateData.img) {
      await unlink(join(createPublicDestination('categories'), category.img))
      category.img = updateData.img
    }
    if (updateData.name) {
      category.name = updateData.name
    }
    return await this.categoriesRepo.save(category)
  }

  async delete(categories: Category[]) {
    return await this.categoriesRepo.softRemove(categories)
  }
}
