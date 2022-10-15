export interface DataFile {
  getPlan: (params:DataFile.Params) => Promise<DataFile.Result>
}

namespace DataFile {
  export type Params = {
    cdPlan: number
    quantidadeBeneficiarios: number
  }
  export type Result = JSON
}