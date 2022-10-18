export interface WriteFileJson {
  writeDataFile: (params: WriteFileJson.Params) => Promise<WriteFileJson.Result>
}

type Pessoa = {
  nome: string
  idade: number
}

export namespace WriteFileJson {
  export type Params = {
    cdPlano: number,
    nomePlano: string,
    total: number,
    pessoas: Pessoa[]
  }

  export type Result = void
}