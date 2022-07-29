import { FingerprintData } from '@shwao/express-fingerprint'
import { Request } from 'express'
import { FindManyOptions, FindOneOptions } from 'typeorm'

export type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>>

export type PartialFields<T, K extends keyof T> = Partial<Pick<T, K>>

export type MutableFields<T, K extends keyof T> = Partial<Omit<T, K>>

export type UnmutableFields<T, K extends keyof T> = Required<Pick<T, K>>

export type FindOne<T = any> = FindOneOptions<T>['where']

export type PageOptions = Pick<FindManyOptions, 'skip' | 'take'>

export type FindMany<T = any> = {
  where: FindManyOptions<T>['where']
} & PageOptions
export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}

export type OneOrMany<T = any> = T | T[]
