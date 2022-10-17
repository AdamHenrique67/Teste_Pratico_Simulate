import express from 'express'
import { setupMiddlewares } from '@/src/main/config/middlewares'

export const app = express()
setupMiddlewares(app)
