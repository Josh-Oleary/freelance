import express, { Request, Response, Router } from 'express'
import Job from '../Classes/Job.js'

const router: Router = express.Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

// Create job
router.post('/:id', async (req: Request, res: Response) => {
  try {
    const userID = req.params.id
    const payload = req.body
    const job = new Job()
    const response = await job.create(userID, payload)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Update job
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const jobID = req.params.id
    const job = new Job()
    const response = await job.update(jobID, payload)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// List jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const job = new Job()
    const response = await job.fetchMany()
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Retrieve job
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const job = new Job()
    const response = await job.fetchOne(id)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// Delete job
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const job = new Job()
    const response = await job.delete(id)
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

/* eslint-disable @typescript-eslint/no-misused-promises */

export default router
