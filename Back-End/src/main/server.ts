import './config/module-alias'
import 'reflect-metadata'
import { Router } from 'express'

import { app } from '@/src/main/config/app'
import { makeSimulateController } from './factories/controllers/simulate-factory'
import { adaptExpressRoute } from './adapters/express-adapter'

const router = Router()
router.post('/simulate', adaptExpressRoute(makeSimulateController()))

app.use(router)
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
