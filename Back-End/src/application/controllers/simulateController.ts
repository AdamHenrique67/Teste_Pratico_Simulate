import { Request, Response } from 'express'
import { Simulate } from "@/src/domain/contracts";
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