export interface FileJson {
  getDataFiles: () => Promise<FileJson.Result>
}

export type PriceModel  = {
  codigo: number,
  minimo_vidas: number
  faixa1: number
  faixa2: number
  faixa3: number
}

export type PlanModel = {
  codigo: number
  registro: string
  nome: string
}

export namespace FileJson {
  export type Result = {
    plans: PlanModel[]
    prices: PriceModel[]
  }
}