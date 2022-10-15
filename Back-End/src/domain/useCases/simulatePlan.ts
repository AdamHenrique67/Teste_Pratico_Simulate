import { DataFile } from "../gateways/dataFile";

type Pessoa = {
  name: string
  idade: number
}

type SavePlan = {
  cdPlan: number
  quantidadeBeneficiarios: number
  pessoas: Pessoa[]
}

export class SimulatePlan {
  constructor(private readonly datafile: DataFile){}

  async simulate({ cdPlan, quantidadeBeneficiarios, pessoas}: SavePlan): Promise<void> {
    this.datafile.getPlan({cdPlan, quantidadeBeneficiarios})
  }
}
  