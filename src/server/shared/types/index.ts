import { FindManyOptions, FindOneOptions } from 'typeorm'
import { FingerprintData } from '@shwao/express-fingerprint'
import { Request } from 'express'

export type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>>

export type PartialFields<T, K extends keyof T> = Partial<Pick<T, K>>

export type MutableFields<T, K extends keyof T> = Partial<Omit<T, K>>

export type UnmutableFields<T, K extends keyof T> = Required<Pick<T, K>>

export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}

export type FindOne<T> = FindOneOptions<T>['where']

export type FindMany<T> = Partial<{
  where: FindManyOptions<T>['where']
  page: Pick<FindManyOptions<T>, 'skip' | 'take'>
}>

export type OneOrMany<T> = T | T[]
