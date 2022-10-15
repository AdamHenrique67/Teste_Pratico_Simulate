export interface DataFile {
  getPlan: (params:DataFile.Params) => Promise<DataFile.Result>
}

namespace DataFile {
  export type Params = {
    cdPlano: number
    quantidadeBeneficiarios: number
  }
  export type Result = {
    codigo: number,
    nomePlano: string;
    minimo_vidas: number
    faixa1: number
    faixa2: number
    faixa3: number
  }
}