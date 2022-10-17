import fs from 'fs'

import { FileJson, PlanModel, PriceModel } from '@/src/domain/gateways'

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
