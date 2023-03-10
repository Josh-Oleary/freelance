import express, { Request, Response, Router } from 'express'
import Profile from '../Classes/Profile.js'

const router: Router = express.Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

// Create profile
router.post('/:id', async (req: Request, res: Response) => {
  try {
    const userID = req.params.id
    const payload = req.body
    const profile = new Profile()
    const response = await profile.create(userID, payload)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Edit profile
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const id = req.params.id
    const profile = new Profile()
    const response = await profile.update(id, payload)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// List profiles
router.get('/', async (req: Request, res: Response) => {
  try {
    const profile = new Profile()
    const response = await profile.fetchMany()
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Retrieve profile
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const profile = new Profile()
    const response = await profile.fetchOne(id)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const profile = new Profile()
    const response = await profile.delete(id)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

/* eslint-disable @typescript-eslint/no-misused-promises */

export default router
