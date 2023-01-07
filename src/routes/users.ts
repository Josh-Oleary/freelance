import express, { Request, Response, Router } from 'express'
import { UserPayload, User } from '../Classes/Users.js';

const router: Router = express.Router()
// Create user
router.post('/', async (req: Request, res: Response) => {
    try {
        let payload: UserPayload = req.body
        const user = new User()
        const userResult = await user.createUser(payload)
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
        const updatedUser = await user.updateUser(userID, payload)
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
        const deletedUser = await user.deleteUser(userID)
        res.status(deletedUser.statusCode).send(deletedUser.data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})
// Get user by id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userID: string = req.params.id
        const user = new User()
        console.log('USER ID: ', userID)
        const userData = await user.fetchSingleUser(userID)
        res.status(userData.statusCode).send(userData.data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

// List users
router.get('/', async (req: Request, res: Response) => {
    try {
        const user = new User()
        const users = await user.fetchUsers()
        res.status(users.statusCode).send(users.data)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

export default router