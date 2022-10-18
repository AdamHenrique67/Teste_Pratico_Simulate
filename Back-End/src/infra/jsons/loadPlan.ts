import { DataFile, PricesPlanDif, WriteDataFile } from "@/src/domain/contracts"
import { Plano } from "@/src/domain/entities"
import { FileJson, PriceModel, WriteFileJson } from "@/src/domain/gateways"

export class LoadPlan implements DataFile, WriteDataFile{

  constructor(private readonly fileSystem: FileJson & WriteFileJson){}

  async writeFile (params: WriteDataFile.Params): Promise<void>{
    await this.fileSystem.writeDataFile(params)
  }

  async getPlan(params: DataFile.Params): Promise<DataFile.Result> {
    const { plans, prices } = await this.fileSystem.getDataFiles()
    const planSelected = plans.find((plano) => {
      return plano.registro === params.registro
    })

    if(planSelected){
      const pricePlan = await this.getCorrectPrice(prices, params.quantidadeBeneficiarios, planSelected!.codigo)
      if(planSelected && pricePlan){
      const plan = new Plano(planSelected, pricePlan)
      return plan
      }
    }
    throw new Error("Invalid Plan")
  }

  private async getCorrectPrice(prices: PriceModel[], quantidadeBeneficiarios: number, cdPlano: number): Promise<PricesPlanDif> {
    let pricePlan: PricesPlanDif
    const pricesPlan: PricesPlanDif[] = []
    prices.filter((price) => {
      if(price.codigo === cdPlano && price.minimo_vidas<= quantidadeBeneficiarios){
        const teste = Object.assign({}, price, { dif: quantidadeBeneficiarios - price.minimo_vidas})
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