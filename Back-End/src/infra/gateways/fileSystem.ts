import fs from 'fs'

import { FileJson, PlanModel, PriceModel, WriteFileJson } from '@/src/domain/gateways'

export class FileSystem implements FileJson, WriteFileJson {

  async writeDataFile (params: WriteFileJson.Params): Promise<WriteFileJson.Result> {
    const data = JSON.stringify(params, null, 2)
    fs.writeFileSync('./src/jsons/proposta.json', data, 'utf-8')
  }

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
