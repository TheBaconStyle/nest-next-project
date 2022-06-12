import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { mkdir, stat } from 'fs'
import { diskStorage } from 'multer'
import { join } from 'path'

type MulterDestCallback = (error: Error, destination: string) => void
type MulterFileNameCallback = (error: Error, filename: string) => void

export function MulterFileInterceptor(fieldName: string, publicPath: string) {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: function (
        _req: Request,
        _file: Express.Multer.File,
        callback: MulterDestCallback,
      ) {
        const newDestination = join(__dirname, '..', 'public', publicPath)
        stat(newDestination, (err, _stat) => {
          if (!err) {
            return callback(null, newDestination)
          }
          mkdir(newDestination, () => callback(null, newDestination))
        })
      },
      filename: function (
        _req: Request,
        file: Express.Multer.File,
        callback: MulterFileNameCallback,
      ) {
        return callback(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
      },
    }),
  })
}
