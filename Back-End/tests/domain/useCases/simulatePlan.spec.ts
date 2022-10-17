import { SimulatePlan } from "@/src/domain/useCases/simulatePlan"
import { DataFile } from "@/src/domain/gateways/dataFile";
import { Simulate } from "@/src/domain/contracts/simulate";

import { mock, MockProxy } from 'jest-mock-extended'

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
      quantidadeBeneficiarios: 2,
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

  test('should receive the value of faixa1 in the valorPlanoPessoa when under 18 years of age', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 2,
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

  test('should receive the value of range 2 in the valorPlanoPessoa when age greater than 17 years and less than or equal to 40', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 2,
      pessoas: [
        {
        nome: 'Joao',
        idade: 18
      },
      {
        nome: 'Adam',
        idade: 40
      }]
    }
    const result = await sut.simulate(data)

    expect(result.pessoas[0].valorPlanoPessoa).toBe(plano.faixa2)
    expect(result.pessoas[1].valorPlanoPessoa).toBe(plano.faixa2)
  })

  test('should receive the value of faixa3 in thePessoaValue when aged over 40', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 2,
      pessoas: [
        {
        nome: 'Joao',
        idade: 41
      },
      {
        nome: 'Adam',
        idade: 50
      }]
    }
    const result = await sut.simulate(data)

    expect(result.pessoas[0].valorPlanoPessoa).toBe(plano.faixa3)
    expect(result.pessoas[1].valorPlanoPessoa).toBe(plano.faixa3)
  })

  test('should return Error when age is less than zero', async() => {
    data = {
      cdPlano: 1,
      quantidadeBeneficiarios: 2,
      pessoas: [
        {
        nome: 'Joao',
        idade: -1
      },
      {
        nome: 'Adam',
        idade: 50
      }]
    }
    const promise = sut.simulate(data)

    await expect(promise).rejects.toThrow(new Error("name ou idade inválidas"))
  })
  
})
