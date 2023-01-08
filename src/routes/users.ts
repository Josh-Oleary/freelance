import Profile from '../Classes/Profile.js';
import express, { Request, Response, Router } from 'express'
import { UserPayload, User } from '../Classes/Users.js';

const router: Router = express.Router()
// Create user
router.post('/', async (req: Request, res: Response) => {
    try {
        const payload: UserPayload = req.body
        const user = new User()
        const userResult = await user.create(payload)
        res.status(userResult.statusCode).json(userResult.data)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            'Message': 'User not created', 
            'Error': error
        })
    }
    
})
// Update user
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.id
        const user = new User()
        const payload = req.body
        const updatedUser = await user.update(userID, payload)
        res.status(updatedUser.statusCode).json(updatedUser.data)

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
    
})
// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.id
        const user = new User()
        const deletedUser = await user.delete(userID)
        res.status(deletedUser.statusCode).json(deletedUser.data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})
// Retrieve user
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.id
        const user = new User()
        const userData = await user.fetchOne(userID)
        res.status(userData.statusCode).json(userData.data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// List users
router.get('/', async (req: Request, res: Response) => {
    try {
        const user = new User()
        const users = await user.fetchMany()
        res.status(users.statusCode).json(users.data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

export default router