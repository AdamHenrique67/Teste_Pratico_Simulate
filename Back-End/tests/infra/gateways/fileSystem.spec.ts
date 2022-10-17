import fs from 'fs'

import { FileSystem } from '@/src/infra/gateways'

jest.mock('fs')

describe('DataFile', () => {
  let sut: FileSystem
  let fakeFs: jest.Mocked<typeof fs>
  
  beforeAll(() => {
    fakeFs = fs as jest.Mocked<typeof fs>
  })
  
  beforeEach(() => {
    sut = new FileSystem()
  })
  
  test('should be called fs 2 times', async () => {
    await sut.getDataFiles()
  
    expect(fakeFs.readFileSync).toHaveBeenCalledTimes(2)
  })
  
  test('should rethrow if fs throws', async () => {
    fakeFs.readFileSync.mockImplementationOnce(() => { throw new Error('file_error')})

    const promise = sut.getDataFiles()

    await expect(promise).rejects.toThrow(new Error('file_error'))
  })
})
 