import { FingerprintData } from '@shwao/express-fingerprint'
import { Request } from 'express'

export interface IReqFingerprint extends Request {
  fingerprint: FingerprintData
}
