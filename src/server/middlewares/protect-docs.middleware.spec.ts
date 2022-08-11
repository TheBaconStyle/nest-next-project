import { ProtectDocsMiddleware } from './protect-docs.middleware'

describe('ProtectDocsMiddleware', () => {
  it('should be defined', () => {
    expect(new ProtectDocsMiddleware()).toBeDefined()
  })
})
