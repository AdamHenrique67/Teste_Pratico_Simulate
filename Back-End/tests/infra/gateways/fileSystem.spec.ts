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
  
  test('should be called fs.readFileSync 2 times', async () => {
    await sut.getDataFiles()
  
    expect(fakeFs.readFileSync).toHaveBeenCalledTimes(2)
  })

  test('should be called fs.writeFileSync ', async () => {
    const dataWrite = {
      cdPlano: 1,
      nomePlano: "Bitix Customer Plano 1",
      total: 22,
      pessoas: [
          {
              nome: "Adam Henrique",
              idade: 21,
              valorPlanoPessoa: 12
          },
          {
              nome: "Joao Jota",
              idade: 17,
              valorPlanoPessoa: 10
          }
      ]
    }
    await sut.writeDataFile(dataWrite)
  
    expect(fakeFs.writeFileSync).toHaveBeenCalledTimes(1)
  })
  
  test('should rethrow if fs throws', async () => {
    fakeFs.readFileSync.mockImplementationOnce(() => { throw new Error('file_error')})

    const promise = sut.getDataFiles()

    await expect(promise).rejects.toThrow(new Error('file_error'))
  })
})
 