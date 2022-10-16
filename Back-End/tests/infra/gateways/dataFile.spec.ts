import { DataFile } from "@/src/domain/gateways"

import fs from 'fs'

export class FsDataFile{
  async getPlan(params: DataFile.Params): Promise<void> {
    const precos = fs.readFileSync('./src/jsons/plans.json', 'utf-8')
    const prices = fs.readFileSync('./src/jsons/prices.json', 'utf-8')
    if(precos){
      const precosPlanos = JSON.parse(precos)
    }
    
  }

}

jest.mock('fs')

describe('DataFile', () => {
  let sut: FsDataFile
  let fakeFs: jest.Mocked<typeof fs>
  let data: any

  beforeAll(() => {
    fakeFs = fs as jest.Mocked<typeof fs>
    data = {
      cdPlano: 'any_id',
      quantidadeBeneficiarios: 'any_quantidadeBeneficiarios'
    }
  })

  beforeEach(() => {
    sut = new FsDataFile()
  })

  test('should be called fs 2 times', async () => {
    await sut.getPlan(data)

    expect(fs.readFileSync).toHaveBeenCalledTimes(2)
  })
})
