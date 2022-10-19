export interface Simulate {
  simulate: (params:Simulate.Params) => Promise<Simulate.Result>
}

export type Pessoa = {
  id: number
  nome: string
  idade: number
}

export type PessoaResult = {
  nome: string
  idade: number
  valorPlanoPessoa: number
}

export namespace Simulate {
  export type Params = {
    registro: string
    quantidadeBeneficiarios: number
    pessoas: Pessoa[]
  }

  export type Result = {
    cdPlano: number
    nomePlano: string
    pessoas: PessoaResult[]
    total: number
  }
  
}