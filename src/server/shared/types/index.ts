import { FindManyOptions, FindOneOptions } from 'typeorm'
import { FingerprintData } from '@shwao/express-fingerprint'
import { Request } from 'express'
<<<<<<< HEAD
import { FindManyOptions, FindOneOptions } from 'typeorm'
=======
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02

export type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>>

export type PartialFields<T, K extends keyof T> = Partial<Pick<T, K>>

export type MutableFields<T, K extends keyof T> = Partial<Omit<T, K>>

export type UnmutableFields<T, K extends keyof T> = Required<Pick<T, K>>

<<<<<<< HEAD
export type FindOne<T = any> = FindOneOptions<T>['where']

export type PageOptions = Pick<FindManyOptions, 'skip' | 'take'>

export type FindMany<T = any> = {
  where: FindManyOptions<T>['where']
} & PageOptions
=======
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}

<<<<<<< HEAD
export type OneOrMany<T = any> = T | T[]
=======
export type FindOne<T> = FindOneOptions<T>['where']

export type FindMany<T> = Partial<{
  where: FindManyOptions<T>['where']
  page: Pick<FindManyOptions<T>, 'skip' | 'take'>
}>

export type OneOrMany<T> = T | T[]
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
