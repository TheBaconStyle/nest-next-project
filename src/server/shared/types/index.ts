import { FingerprintData } from '@shwao/express-fingerprint'
import { IsNumber, ValidationArguments } from 'class-validator'
import { Request } from 'express'
import { FindConditions } from 'typeorm'

export type RequiredFields<T, K extends keyof T> = Partial<T> &
  Required<Pick<T, K>>

export type MutableFields<T, K extends keyof T> = Partial<Omit<T, K>>

export type UnmutableFields<T, K extends keyof T> = Required<Pick<T, K>>

export type FindOne<T> = FindConditions<T>
export type FindMany<T> = FindConditions<T> | FindConditions<T>[]

export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}

export interface PageOptions {
  skip: number
  take: number
}

const isNumberValError = (valArgs: ValidationArguments) =>
  `${valArgs.property} query param must be a number`
export class PageDto {
  @IsNumber(null, {
    message: isNumberValError,
  })
  page: number

  @IsNumber(null, {
    message: isNumberValError,
  })
  size: number

  getPageOptions(): PageOptions {
    return {
      skip: (this.page - 1) * this.size,
      take: this.size,
    }
  }
}
