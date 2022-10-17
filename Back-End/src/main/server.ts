import 'reflect-metadata'
import express, { json, Router } from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(json())
app.use((req, res, next) => {
 res.type('json')
 next()
})

const router = Router()
router.post('/simulate', (req, res) => {
 res.send({ data: 'test' })
})

app.use(router)
app.listen(8080, () => console.log('Server running at http://localhost:8080'))
