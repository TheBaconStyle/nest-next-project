import { FingerprintData } from '@shwao/express-fingerprint'
import { Request } from 'express'
import { User } from 'src/server/entities/users.entity'

export interface UserRequest extends Request {
  user: User
}

export interface FingerprintRequest extends Request {
  fingerprint: FingerprintData
}
