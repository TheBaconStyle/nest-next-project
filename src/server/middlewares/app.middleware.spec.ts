import {SessionMiddleware} from './session.middleware'

describe('AppMiddleware', () => {
  it('should be defined', () => {
    expect(new SessionMiddleware()).toBeDefined()
  })
})
