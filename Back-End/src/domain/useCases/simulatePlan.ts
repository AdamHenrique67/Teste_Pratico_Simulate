import { DataFile } from "../gateways/dataFile";

type Pessoa = {
  nome: string
  idade: number
}

type SavePlan = {
  cdPlano: number
  quantidadeBeneficiarios: number
  pessoas: Pessoa[]
}

type Plano  = {
  codigo: number,
  nomePlano: string;
  minimo_vidas: number
  faixa1: number
  faixa2: number
  faixa3: number
}
export class SimulatePlan {
  constructor(private readonly datafile: DataFile){}

  async simulate(dados: SavePlan): Promise<void> {
    const plano = await this.datafile.getPlan({cdPlano: dados.cdPlano, quantidadeBeneficiarios: dados.quantidadeBeneficiarios})
  }
}
  