import { SimulatePlan } from "@/src/domain/useCases";
import { HttpResponse, serverError } from "@/src/application/helpers/http";

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

  async perform(params: HttpRequest): Promise<HttpResponse<any>> {
    try{
      const result = this.simulatePlan.simulate(params)
      return {
      statusCode: 200,
      data: result
      }
    }catch(error){
      return serverError(error as Error)
    }
    
  }
}