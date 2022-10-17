import { FileJson, PlanModel, PriceModel } from '@/src/domain/gateways'
import fs from 'fs'

export class FileSystem implements FileJson {
  async getDataFiles (): Promise<FileJson.Result> {
    let plans: PlanModel[] = []
    let prices: PriceModel[] = []
    const plansString = fs.readFileSync('./src/jsons/plans.json', 'utf-8')
    const pricesString = fs.readFileSync('./src/jsons/prices.json', 'utf-8')
    if(plansString && pricesString){
      plans = JSON.parse(plansString)
      prices = JSON.parse(pricesString)
    }
    return {plans, prices}  
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
  
  test('should rethrow if fs throws', async () => {
    fakeFs.readFileSync.mockImplementationOnce(() => { throw new Error('file_error')})

    const promise = sut.getDataFiles()

    await expect(promise).rejects.toThrow(new Error('file_error'))
  })
})
 