import { join } from 'path'
import { cwd } from 'process'

export function createPublicDestination(publicPath: string) {
  return join(cwd(), 'public', publicPath)
}
