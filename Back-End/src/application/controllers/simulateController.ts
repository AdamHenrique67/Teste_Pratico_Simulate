import { SimulatePlan } from "@/src/domain/useCases";
import { HttpResponse, serverError, ok } from "@/src/application/helpers/http";

type Pessoa = {
  nome: string
  idade: number
}

type HttpRequest = {
  cdPlano: number
  quantidadeBeneficiarios: number
  pessoas: Pessoa[]
}

export class SimulateController {
  constructor(private readonly simulatePlan: SimulatePlan){}

  async handle(params: HttpRequest): Promise<HttpResponse<any>> {
    try{
      const result = await this.simulatePlan.simulate(params)
      return ok(result)
    }catch(error){
      return serverError(error as Error)
    }
    
  }
}