import { SimulatePlan } from "@/src/domain/useCases";
import { HttpResponse, serverError, ok } from "@/src/application/helpers/http";
import { Request, Response } from 'express'
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

  async handle(req: Request, res: Response): Promise<any> {
    try{
      const params: HttpRequest = req.body
      const result = await this.simulatePlan.simulate(params)
      res.status(200).send(result)
    }catch(error){
      res.status(500).send('Server Error')
    }
    
  }
}