import express, { Request, Response, Router } from 'express'
import { User } from '../Classes/Users.js'

const router: Router = express.Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = new User()
  const { statusCode, data } = await user.validate(email, password)
  res.status(statusCode).json(data)
})

/* eslint-disable @typescript-eslint/no-misused-promises */

export default router
