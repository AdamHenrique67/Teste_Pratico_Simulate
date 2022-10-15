import { SimulatePlan } from "../src/domain/useCases/simulatePlan"
import { DataFile } from "../src/domain/gateways/dataFile";


import { mock, MockProxy } from 'jest-mock-extended'

describe('savePlan', () => {
  let dataFile: MockProxy<DataFile>
  let data: any 
  let sut: SimulatePlan

  beforeAll(() =>{
    dataFile = mock()
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 1,
      pessoas: [{
        nome: 'Joao',
        idade: 17
      }, {
        nome: 'Adam',
        idade: 21
      }]
    }
  })

  beforeEach(() => {
    sut = new SimulatePlan(dataFile)
  })

  test('should call DataFile with correct params', async() => {
    await sut.simulate(data)

    expect(dataFile.getPlan).toHaveBeenCalledWith({cdPlano: data.cdPlano, quantidadeBeneficiarios: data.quantidadeBeneficiarios})
    expect(dataFile.getPlan).toHaveBeenCalledTimes(1)
  })
})
