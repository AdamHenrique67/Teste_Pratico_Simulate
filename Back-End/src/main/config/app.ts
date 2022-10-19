import express, { Router }  from 'express'
import { setupMiddlewares } from '@/src/main/config/middlewares'
import { celebrate } from './celebrate-error'
import { router } from '../routes/router'


export const app = express()
setupMiddlewares(app)
app.use(router)
app.use(celebrate)
