import { join } from 'path'
import { Request } from 'express'
import { exists, mkdir } from 'fs'

type MulterDestCallback = (error: Error, destination: string) => void
type MulterFileNameCallback = (error: Error, filename: string) => void

export class MulterHelper {
  static createDestination(
    public_path: string,
  ): (
    req: Request,
    file: Express.Multer.File,
    callback: MulterDestCallback,
  ) => void {
    return function destination(req, file, callback) {
      const newDestination = join(__dirname, '..', 'public', public_path)
      exists(newDestination, (isExist) => {
        if (isExist) {
          return callback(null, newDestination)
        }
        return mkdir(newDestination, () => {
          return callback(null, newDestination)
        })
      })
    }
  }
  static createFileName(): (
    req: Request,
    file: Express.Multer.File,
    callback: MulterFileNameCallback,
  ) => void {
    return function filename(req, file, callback) {
      return callback(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  }
}
