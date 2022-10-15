import { SimulatePlan } from "../src/domain/useCases/simulatePlan"
import { DataFile } from "../src/domain/gateways/dataFile";


import { mock, MockProxy } from 'jest-mock-extended'

describe('savePlan', () => {
  test('should call DataFile with correct params', async() => {
    const data = {
      cdPlan: 1,
      quantidadeBeneficiarios: 1,
      pessoas: [{
        name: 'Joao',
        idade: 17
      }, {
        name: 'Adam',
        idade: 21
      }]
      
    }
    const dataFile = mock<DataFile>()
    const sut = new SimulatePlan(dataFile)

    await sut.simulate(data)

    expect(dataFile.getPlan).toHaveBeenCalledWith({cdPlan: data.cdPlan, quantidadeBeneficiarios: data.quantidadeBeneficiarios})
    expect(dataFile.getPlan).toHaveBeenCalledTimes(1)
  })
})
