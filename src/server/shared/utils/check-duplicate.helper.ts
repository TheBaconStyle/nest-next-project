import { readdir } from 'fs/promises'
import { FileSystemStoredFile } from 'nestjs-form-data'
import { createPublicDestination } from './multer.helper'

export async function checkImgDuplicates(
  publicPath: string,
  image: FileSystemStoredFile,
) {
  const images = (await readdir(createPublicDestination(publicPath))).filter(
    (img) => {
      const fsName = img.split('-')[0]
      const reqName = image.originalName.split('.')[0]
      return fsName === reqName
    },
  )
  if (images.length > 1) {
    await image.delete()
  }
}
