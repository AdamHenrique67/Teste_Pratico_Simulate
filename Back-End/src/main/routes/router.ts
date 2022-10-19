import { Router } from "express"
import { adaptExpressRoute } from "../adapters/express-adapter"
import { makeSimulateController } from "../factories/controllers/simulate-factory"
import { validationReq } from "../middlewares/celebrate"

export const router = Router()
router.post('/simulate',validationReq , adaptExpressRoute(makeSimulateController()))