import fs from 'fs'
const planos = fs.readFileSync('./src/jsons/prices.json', 'utf-8')
const plans = JSON.parse(planos)

type Plano  = {
  codigo: number,
  minimo_vidas: number
  faixa1: number
  faixa2: number
  faixa3: number
}

const t = plans.filter((plano: Plano) => {
  return plano.codigo === 1 && plano.minimo_vidas >=1 && plano.minimo_vidas<4
})
console.log(t)