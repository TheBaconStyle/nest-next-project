import { Request } from 'express'

export interface ISignedCokies<T = any> extends Request {
  signedCookies: T
}
