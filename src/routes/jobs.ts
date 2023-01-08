import express, { Request, Response, Router } from 'express'
import { UserPayload, User } from '../Classes/Users.js';
import Job from '../Classes/Job.js';

const router: Router = express.Router()

// Create job
router.post('/jobs', async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const job = new Job()
        const response = await job.create(payload)
        res.status(response.statusCode).json(response.data)
        
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Update job

// Delete job

// Retrieve job

// List jobs