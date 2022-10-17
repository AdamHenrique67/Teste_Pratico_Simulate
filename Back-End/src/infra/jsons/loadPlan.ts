import { DataFile, PricesPlanDif } from "@/src/domain/contracts"
import { Plano } from "@/src/domain/entities"
import { FileJson, PriceModel } from "@/src/domain/gateways"

export class LoadPlan implements DataFile{

  constructor(private readonly fileSystem: FileJson){}

  async getPlan(params: DataFile.Params): Promise<DataFile.Result> {
    const { plans, prices } = await this.fileSystem.getDataFiles()
    const planSelected = plans.find((plano) => {
      return plano.codigo === params.cdPlano
    })

    const pricePlan = await this.getCorrectPrice(prices, params)
    if(planSelected && pricePlan){
      const plan = new Plano(planSelected, pricePlan)
      return plan
    }
    throw new Error("Invalid Plan")
  }

  private async getCorrectPrice(prices: PriceModel[], params: DataFile.Params): Promise<PricesPlanDif> {
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
    return pricePlan
  }

}