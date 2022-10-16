import { SimulatePlan } from "../src/domain/useCases/simulatePlan"
import { DataFile } from "../src/domain/gateways/dataFile";


import { mock, MockProxy } from 'jest-mock-extended'
import { Simulate } from "../src/domain/entities/simulate";

describe('savePlan', () => {
  let dataFile: MockProxy<DataFile>
  let data: Simulate.Params 
  let sut: SimulatePlan
  let plano: any


  beforeAll(() =>{
    plano = {
      cdPlano: 1,
      nomePlano: "Unimed",
      minimo_vidas: 4,
      faixa1: 17,
      faixa2: 24,
      faixa3: 30
    }

    dataFile = mock()
    dataFile.getPlan.mockResolvedValue(plano)
  })

  beforeEach(() => {
    sut = new SimulatePlan(dataFile)
  })

  test('should call DataFile with correct params', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 1,
      pessoas: [{
        nome: 'Joao',
        idade: 17
      }, {
        nome: 'Adam',
        idade: 39
      }]
    }

    await sut.simulate(data)

    expect(dataFile.getPlan).toHaveBeenCalledWith({cdPlano: data.cdPlano, quantidadeBeneficiarios: data.quantidadeBeneficiarios})
    expect(dataFile.getPlan).toHaveBeenCalledTimes(1)
  })

  test('should receive value person faixa 1 when age under 18 ', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 1,
      pessoas: [
        {
        nome: 'Joao',
        idade: 17
      },
      {
        nome: 'Adam',
        idade: 0
      }]
    }

    const result = await sut.simulate(data)

    expect(result.pessoas[0].valorPlanoPessoa).toBe(plano.faixa1)
    expect(result.pessoas[1].valorPlanoPessoa).toBe(plano.faixa1)
  })

 
  
})
