import { ObjectID } from 'bson'
import { APIResponse } from './Users'
import API from './API.js'

interface JobData {
  _user: ObjectID
  createdAt: string
  updatedAt?: string
  title: string
  payStructure: 'hourly' | 'flat'
  payTotal: number
  description: string
  preferredClientType?: 'agency' | 'individual'
  preferredExperience?: 'junior' | 'mid' | 'expert'
  jobDuration: 'onetime' | 'longterm' | 'cth' | 'fulltime'
  certified: boolean
  skillsRequired: string[]
  status?: 'open' | 'screening' | 'inprogress' | 'review' | 'complete'
}

class Job extends API {
  constructor () {
    super('jobs')
  }

  async create (userID: string, data: JobData): Promise<APIResponse> {
    try {
      const doc = data
      doc._user = new ObjectID(userID)
      doc.createdAt = new Date().toISOString()
      doc.status = 'review'
      const newJob = await this.api.insertOne(doc)

      return {
        statusCode: 201,
        data: newJob
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        data: error
      }
    }
  }
}

export default Job
