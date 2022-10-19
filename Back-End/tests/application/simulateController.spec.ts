import request from 'supertest'
import { HttpRequest } from '@/src/application/controllers/simulateController'
import { app } from '@/src/main/config/app'


describe('POST/ simulate', () => {
  let data: HttpRequest

  test('should be able to simulate a plan', async() => {
    data = {
      registro: 'reg1',
      quantidadeBeneficiarios: 2,
      pessoas: [{
        id: 1,
        nome: 'Joao',
        idade: 17
      }, {
        id: 2,
        nome: 'Adam',
        idade: 39
      }]
    }

    const response = await request(app).post('/simulate').send(data)
    expect(response.status).toBe(200)
  })

  test('should not be able to simulate a plan with if the data is invalid', async() => {
    data = {
      registro: '',
      quantidadeBeneficiarios: 2,
      pessoas: [{
        id: 1,
        nome: 'Joao',
        idade: 17
      }, {
        id: 2,
        nome: 'Adam',
        idade: 39
      }]
    }

    const response = await request(app).post('/simulate').send(data)
    expect(response.status).toBe(400)
  })

  test('should not be able to simulate a plan if the record is invalid', async() => {
    data = {
      registro: 'reg',
      quantidadeBeneficiarios: 2,
      pessoas: [{
        id: 1,
        nome: 'Joao',
        idade: 17
      }, {
        id: 2,
        nome: 'Adam',
        idade: 39
      }]
    }

    const response = await request(app).post('/simulate').send(data)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Registro Inválido')
  })
})
