import { FindConditions } from 'typeorm'
export type FindOne<T> = FindConditions<T>
export type FindMany<T> = FindConditions<T> | FindConditions<T>[]
