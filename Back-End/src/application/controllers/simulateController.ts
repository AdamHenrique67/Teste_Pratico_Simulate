import { Simulate } from "@/src/domain/contracts";
import { badRequest, ok } from "@/src/application/helpers";
type Pessoa = {
  nome: string
  idade: number
}

type HttpRequest = {
  registro: string
  quantidadeBeneficiarios: number
  pessoas: Pessoa[]
}

export class SimulateController {
  constructor(private readonly simulatePlan: Simulate){}

  async handle(req: HttpRequest): Promise<any> {
    try{
      const result = await this.simulatePlan.simulate(req)
      return ok(result)
    }catch(error){
      return badRequest(new Error("InvalidReg"))
    }
    
  }
}