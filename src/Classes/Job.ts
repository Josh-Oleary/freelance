import DB from './db.js'
import { ObjectID } from 'bson'
import { APIResponse, User } from './Users'

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

class Job {
    collection = 'jobs'
    db = new DB(this.collection)
    client = this.db.client
    jobs = this.client.db().collection(this.collection)
    userID: string | undefined

    constructor (userID: string | undefined = undefined) {
        this.userID = userID
    }

    async create (data: JobData): Promise<APIResponse> {
        try {
            let doc = data
            doc._user = new ObjectID(this.userID)
            doc.createdAt = new Date().toISOString()
            doc.status = 'review'
            const newJob = await this.jobs.insertOne(doc)

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

    async update () {

    }

    async fetch () {

    }

    async fetchOne () {

    }

    async deleteOne () {

    }
}

export default Job