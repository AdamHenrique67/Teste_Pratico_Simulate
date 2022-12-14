import { Pessoa, Simulate, DataFile, WriteDataFile } from "@/src/domain/contracts";
export class SimulatePlan implements Simulate {
  constructor(private readonly datafile: DataFile & WriteDataFile){}

  async simulate(dados: Simulate.Params): Promise<Simulate.Result> {
    const plano = await this.datafile.getPlan({registro: dados.registro, quantidadeBeneficiarios: dados.quantidadeBeneficiarios})
    if(!plano){
      throw new Error('plano indefinido')
    }
    const teste: any[] = []
    let contador = 0
    dados.pessoas.forEach((pessoa: Pessoa) => {
      if(pessoa.nome === null || pessoa.idade < 0) {
        throw new Error('name ou idade inválidas')
      }else{
        if(pessoa.idade >= 0 && pessoa.idade < 18){
          pessoa = Object.assign({}, pessoa, { valorPlanoPessoa: plano.faixa1})
          teste.push(pessoa)
          contador = plano.faixa1 + contador
        }
        if(pessoa.idade >= 18 && pessoa.idade <= 40){
          pessoa = Object.assign({}, pessoa, { valorPlanoPessoa: plano.faixa2})
          teste.push(pessoa)
          contador = plano.faixa2 + contador
        }
        if(pessoa.idade >= 40){
          pessoa = Object.assign({}, pessoa, { valorPlanoPessoa: plano.faixa3})
          teste.push(pessoa)
          contador = plano.faixa3 + contador
        }
      }
    })
    const result = Object.assign({}, { cdPlano: plano.cdPlano, nomePlano: plano.nomePlano, total: contador, pessoas: teste})
    await this.datafile.writeFile(result)
    return result
  }

}
  