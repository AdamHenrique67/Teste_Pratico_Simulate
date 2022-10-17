import { DataFile, PlanModel, PriceModel, PricesPlanDif } from "@/src/domain/gateways"
import { FileJson } from "@/src/domain/gateways"
import { Plano } from "@/src/domain/entities"

import { MockProxy, mock } from "jest-mock-extended"
export class LoadPlan implements DataFile{

  constructor(private readonly fileSystem: FileJson){}

  async getPlan(params: DataFile.Params): Promise<DataFile.Result> {
    const { plans, prices } = await this.fileSystem.getDataFiles()

    const planSelected = plans.find((plano) => {
      return plano.codigo === params.cdPlano
    })

    let pricePlan: PricesPlanDif
    const pricesPlan: PricesPlanDif[] = []
    prices.filter((price) => {
      if(price.codigo === params.cdPlano && price.minimo_vidas<= params.quantidadeBeneficiarios){
        const teste = Object.assign({}, price, { dif: params.quantidadeBeneficiarios - price.minimo_vidas})
        pricesPlan.push(teste)
      }
    })

    if(pricesPlan.length > 1){
      pricePlan = pricesPlan.reduce(function(prev, current) {
         return prev.dif < current.dif ? prev : current
      })
    }else{
      pricePlan = pricesPlan[0]
    }    
    if(planSelected && pricePlan){
      const plan = new Plano(planSelected, pricePlan)
      return plan
    }
    throw new Error("Invalid Plan")
  }

}


describe('LoadPlan', () => {
  let sut: LoadPlan
  let fileSystem: MockProxy<FileJson>
  let plans: PlanModel[] 
  let prices: PriceModel[]
  let data: {
    cdPlano: number
    quantidadeBeneficiarios: number
  }
  
  beforeAll(() => {
    data = {
      cdPlano: 1,
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

  test('should call FileJson', async () => {
    await sut.getPlan(data)

    expect(fileSystem.getDataFiles).toHaveBeenCalledTimes(1)
  })

  test('should return a plan that has the code equal to the code received', async () => {
    const result = await sut.getPlan(data)

    expect(result.cdPlano).toBe(data.cdPlano)
  })

  test('should return a plan with correct values ​​in relation to the minimum number of lives', async () => {
    const result = await sut.getPlan(data)

    expect(result.faixa1).toBe(prices[0].faixa1)
    expect(result.faixa2).toBe(prices[0].faixa2)
    expect(result.faixa3).toBe(prices[0].faixa3)
  })

  test('should return an invalid plan error when cdPlan is invalid', async () => {
    data = {
      cdPlano: 0,
      quantidadeBeneficiarios: 5
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

