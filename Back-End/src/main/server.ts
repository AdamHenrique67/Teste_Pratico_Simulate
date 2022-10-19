import './config/module-alias'
import 'reflect-metadata'
import { Router } from 'express'
import { app } from '@/src/main/config/app'
import { makeSimulateController } from './factories/controllers/simulate-factory'
import { adaptExpressRoute } from './adapters/express-adapter'
import { validationReq } from './middlewares/celebrate'
import { celebrate } from './config/celebrate-error'

const router = Router()

router.post('/simulate',validationReq , adaptExpressRoute(makeSimulateController()))

app.use(router)
app.use(celebrate)
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
