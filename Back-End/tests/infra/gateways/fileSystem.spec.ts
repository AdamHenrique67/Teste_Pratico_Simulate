import fs from 'fs'

export class FileSystem {
  async getDataFiles (): Promise<void> {
    const precos = fs.readFileSync('./src/jsons/plans.json', 'utf-8')
    const prices = fs.readFileSync('./src/jsons/prices.json', 'utf-8')
  }
}

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
 })
 