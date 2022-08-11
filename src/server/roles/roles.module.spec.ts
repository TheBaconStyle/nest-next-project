import { RolesController } from './roles.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { RolesModule } from './roles.module'
import { RolesService } from './roles.service'

describe('RolesModule', () => {
  let mod: RolesModule
  let service: RolesService
  let controller: RolesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RolesModule],
    }).compile()
    mod = module.get<RolesModule>(RolesModule)
    service = module.get<RolesService>(RolesService)
    controller = module.get<RolesController>(RolesController)
  })

  it('module defined', () => {
    expect(mod).toBeDefined()
  })

  it('service defined', () => {
    expect(service).toBeDefined()
  })

  it('controller defined', () => {
    expect(controller).toBeDefined()
  })

  it('qwe', async () => {
    expect(await service.create({ name: 'qwe' })).toHaveProperty('id')
  })
})
