export interface WriteDataFile {
  writeFile: (params: WriteDataFile.Params) => Promise<WriteDataFile.Result>

}

type Pessoa = {
  nome: string
  idade: number
}

export namespace WriteDataFile{
  export type Params = {
    cdPlano: number,
    nomePlano: string,
    total: number,
    pessoas: Pessoa[]
  }

  export type Result = void
}