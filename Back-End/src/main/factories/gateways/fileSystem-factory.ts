import { FileSystem } from '@/src/infra/gateways'

export const makeFileSystem = (): FileSystem => {
  return new FileSystem()
}