import './config/module-alias'
import 'reflect-metadata'
import { Router } from 'express'

import { app } from '@/src/main/config/app'
import { makeSimulateController } from './factories/controllers/simulate-factory'

const router = Router()
router.post('/simulate', (req, res) => makeSimulateController().handle(req, res))

app.use(router)
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
