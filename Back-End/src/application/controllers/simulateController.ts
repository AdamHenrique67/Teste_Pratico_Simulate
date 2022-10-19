import { Simulate } from "@/src/domain/contracts";
import { badRequest, HttpResponse, ok } from "@/src/application/helpers";

export type Pessoa = {
  id: number
  nome: string
  idade: number
}

export type HttpRequest = {
  registro: string
  quantidadeBeneficiarios: number
  pessoas: Pessoa[]
}

export class SimulateController {
  constructor(private readonly simulatePlan: Simulate){}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try{
      const result = await this.simulatePlan.simulate(req)
      return ok(result)
    }catch{
      return badRequest(new Error("Registro Inválido"))
    }
    
  }
}