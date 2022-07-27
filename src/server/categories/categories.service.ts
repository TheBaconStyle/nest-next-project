import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { PartialFields, RequiredFields } from './../shared/types/index'
import { Category } from './entities/categories.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}
  async create(createData: RequiredFields<Category, 'name' | 'img'>) {
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

  async delete(categories: Category[]) {
    // return await this.categoriesRepo.softRemove(categories)
  }
}
