import { FindManyOptions, FindOneOptions } from 'typeorm'

export type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>>

export type PartialFields<T, K extends keyof T> = Partial<Pick<T, K>>

export type UnmutableFields<T, K extends keyof T> = Partial<Omit<T, K>>

export type MutableFields<T, K extends keyof T> = Required<Pick<T, K>>

export type FindOne<T = any> = FindOneOptions<T>['where']

export type PageOptions = Pick<FindManyOptions, 'skip' | 'take'>

export type FindMany<T = any> = {
  select?: FindManyOptions<T>['select']
  where?: FindManyOptions<T>['where']
} & PageOptions

export type OneOrMany<T = any> = T | T[]
