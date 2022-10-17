export interface DataFile {
  getPlan: (params:DataFile.Params) => Promise<DataFile.Result>
}
export namespace DataFile {
  export type Params = {
    cdPlano: number
    quantidadeBeneficiarios: number
  }
  export type Result = {
    cdPlano: number
    nomePlano: string
    faixa1: number
    faixa2: number
    faixa3: number
  }
}

export type PricesPlanDif = {
  codigo: number,
  minimo_vidas: number
  faixa1: number
  faixa2: number
  faixa3: number
  dif: number
}