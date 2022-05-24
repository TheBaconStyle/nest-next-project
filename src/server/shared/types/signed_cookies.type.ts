import { Request } from 'express'

export interface ISignedCokies<T> extends Request {
  signedCookies: T
}
