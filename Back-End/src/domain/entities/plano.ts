import { PlanModel, PricesPlanDif } from "@/src/domain/gateways"

export class Plano {
  cdPlano: number
  nomePlano: string
  faixa1: number
  faixa2: number
  faixa3: number

  constructor(planData: PlanModel, priceData: PricesPlanDif){
    this.cdPlano = planData.codigo
    this.nomePlano = planData.nome
    this.faixa1 = priceData.faixa1
    this.faixa2 = priceData.faixa2
    this.faixa3 = priceData.faixa3
  }
}