import './config/module-alias'
import 'reflect-metadata'
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express'
import { app } from '@/src/main/config/app'
import { makeSimulateController } from './factories/controllers/simulate-factory'
import { adaptExpressRoute } from './adapters/express-adapter'
import { isCelebrateError } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';


const router = Router()
router.post('/simulate',celebrate({
  [Segments.BODY]: {
    registro: Joi.string().required(),
    quantidadeBeneficiarios: Joi.number().min(1).required(),
    pessoas: Joi.array().items(
      Joi.object().keys({
        nome: Joi.string().required(),
        idade: Joi.number().min(0).required()
    })).min(1).required(),
  },
}), adaptExpressRoute(makeSimulateController()))

app.use(router)
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      const values = err.details.values();

      let { message } = values.next().value.details[0];

      message = message.replace('"', '').replace('"', '');

      return response.status(400).json({
        status: 'error',
        type: 'validation',
        message,
      });
    }

  },
)
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
