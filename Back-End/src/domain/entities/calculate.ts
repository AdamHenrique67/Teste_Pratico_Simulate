export interface Calculate {
  calculate: (params:Calculate.Params) => Promise<void>
}


type Plano  = {
  cdPlano: number,
  nomePlano: string;
  minimo_vidas: number
  faixa1: number
  faixa2: number
  faixa3: number
}

export namespace Calculate {
  export type Params = Plano 
}