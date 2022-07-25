import { BadRequestException } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { cwd } from 'process'

export function createPublicDestination(publicPath: string) {
  return join(cwd(), 'public', publicPath)
}

export function configureStorage(publicPath: string) {
  return diskStorage({
    destination(req, file, callback) {
      return callback(null, createPublicDestination(publicPath))
    },
    filename(req, file, callback) {
      return callback(null, `${Date.now()}${extname(file.originalname)}`)
    },
  })
}

export function fileMimetypeFilter(mimeTypes: string[]) {
  return function (
    _req: Request,
    file: Express.Multer.File,
    callback: (err, acceptFile: boolean) => void,
  ) {
    if (mimeTypes.includes(file.mimetype)) {
      return callback(null, true)
    }
    return callback(new BadRequestException('Unsupported img mimetype'), false)
  }
}

export const ImageMimeTypes = ['image/gif', 'image/jpeg', 'image/png']

interface MulterConfig {
  publicPath: string
  acceptedMimeTypes: string[]
  fileCountLimit: number
  fileSizeLimit: number
}

export function configureMulter(config: MulterConfig): MulterOptions {
  return {
    storage: configureStorage(config.publicPath),
    limits: { files: config.fileCountLimit, fileSize: config.fileSizeLimit },
    fileFilter: fileMimetypeFilter(config.acceptedMimeTypes),
  }
}
