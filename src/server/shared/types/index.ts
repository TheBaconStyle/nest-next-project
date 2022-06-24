import { FingerprintData } from '@shwao/express-fingerprint'
import { IsNumber } from 'class-validator'
import { Request } from 'express'
import { FindConditions } from 'typeorm'

export type FindOne<T> = FindConditions<T>
export type FindMany<T> = FindConditions<T> | FindConditions<T>[]

export type RequiredFields<T, K extends keyof T> = Partial<T> &
  Required<Pick<T, K>>

export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}

export interface PageOptions {
  take: number
  skip: number
}

export class PageDto implements PageOptions {
  @IsNumber()
  skip: number

  @IsNumber()
  take: number
}
