import { PlanModel, PriceModel, WriteFileJson } from "@/src/domain/gateways"
import { FileJson } from "@/src/domain/gateways"
import { LoadPlan } from "@/src/infra/jsons"

import { MockProxy, mock } from "jest-mock-extended"

describe('LoadPlan', () => {
  let sut: LoadPlan
  let fileSystem: MockProxy<FileJson & WriteFileJson>
  let plans: PlanModel[] 
  let prices: PriceModel[]
  let data: {
    registro: string
    quantidadeBeneficiarios: number
  }
  
  beforeAll(() => {
    data = {
      registro: 'reg1',
      quantidadeBeneficiarios: 5
    }

    plans = [
    {
      codigo: 1,
      registro: 'reg1',
      nome: 'Unimed'
    },
    {
      codigo: 2,
      registro: 'reg2',
      nome: 'Usisaúde'
    }
  ]

  prices = [
    {
      codigo: 1,
      minimo_vidas: 4,
      faixa1: 17,
      faixa2: 24,
      faixa3: 30
    },
    {
      codigo: 1,
      minimo_vidas: 1,
      faixa1: 20,
      faixa2: 30,
      faixa3: 35
    },
    {
      codigo: 2,
      minimo_vidas: 1,
      faixa1: 10,
      faixa2: 15,
      faixa3: 20
    }
  ]

    fileSystem = mock()
    fileSystem.getDataFiles.mockResolvedValue({plans, prices})
  })

  beforeEach(() => {
    sut = new LoadPlan(fileSystem)
  })

  test('should call FileJson.getDataFiles', async () => {
    await sut.getPlan(data)

    expect(fileSystem.getDataFiles).toHaveBeenCalledTimes(1)
  })

  test('should call FileJson.writeDataFiles', async () => {
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
    await sut.writeFile(dataWrite)

    expect(fileSystem.writeDataFile).toHaveBeenCalledTimes(1)
  })

  test('should return correct plan', async () => {
    const result = await sut.getPlan(data)

    expect(result.cdPlano).toBe(plans[0].codigo)
  })

  test('should return a plan with correct values ​​in relation to the minimum number of lives', async () => {
    const result = await sut.getPlan(data)

    expect(result.faixa1).toBe(prices[0].faixa1)
    expect(result.faixa2).toBe(prices[0].faixa2)
    expect(result.faixa3).toBe(prices[0].faixa3)
  })

  test('should return an invalid plan error when registro is invalid', async () => {
    data = {
      registro: 'invalid',
      quantidadeBeneficiarios: 5
    }
    const promise = sut.getPlan(data)

    await expect(promise).rejects.toThrow(new Error("Invalid Plan"))
  })

  test('should return an invalid plan error when quantidadeBeneficiarios is under 1', async () => {
    data = {
      registro: 'reg1',
      quantidadeBeneficiarios: 0
    }
    const promise = sut.getPlan(data)

    await expect(promise).rejects.toThrow(new Error("Invalid Plan"))
  })


  test('should rethrow if FileJson throws', async () => {
    fileSystem.getDataFiles.mockRejectedValueOnce(new Error('file_error'))
    const promise = sut.getPlan(data)

    await expect(promise).rejects.toThrow(new Error("file_error"))
  })
})

