import express from 'express'
import { authUser } from './controller.js'

const route = express.Router()

route.post('/login', authUser)

export default route
