import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import connect from './db.js'
import userRoute from './userRoute.js'

config()

connect()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', userRoute)

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
app.use(errorHandler)
app.listen(port, () => {
  console.log(`server running on port ${process.env.PORT}`)
})
