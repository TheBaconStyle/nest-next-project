import { Request } from 'express'

export interface IReqCookies<T = any> extends Request {
  cookies: T
}
