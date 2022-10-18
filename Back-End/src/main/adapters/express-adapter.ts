import { SimulateController } from '@/src/application/controllers/simulateController'
import { RequestHandler } from 'express'

type Adapter = (controller: SimulateController) => RequestHandler

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body })
  const json = statusCode === 200 ? data : { error: data.message }
  res.status(statusCode).json(json)
}
