import express, { Request, Response, Router } from 'express'
import { UserPayload, User } from '../Classes/Users.js';

const router: Router = express.Router()

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = new User()
    const { statusCode, data } = await user.validateUser(email, password)
    res.status(statusCode).json(data)
})

export default router