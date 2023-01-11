import DB from './db.js'
import { Auth } from './Authentication.js'
import API from './API.js'

export interface APIResponse {
  statusCode: number
  data: any
}

interface UserPayload {
  portfolioID?: string | null
  firstName: string
  lastName: string
  country: string
  skills: string[]
  jobHistory?: string[]
  rating?: number
  verified: boolean
  createdAt: Date | string
  updatedAt?: Date
  lastLogin?: Date
  payments?: string[]
  reviews?: object[]
  email: string
  password?: string
  hash: string | undefined
  salt: string | undefined
  userType: 'employer' | 'employee' | 'agency' | 'admin'
}

export interface UserSearchFilter {
  _id?: object
  _user?: object
}

class User extends API {
  collection = 'users'
  db = new DB(this.collection)
  client = this.db.client
  users = this.client.db().collection(this.collection)

  constructor () {
    super('users')
  }

  async create (data: UserPayload): Promise<APIResponse> {
    try {
      const auth = new Auth()
      const doc = data
      const passData = auth.setPassword(doc.password)
      const { hash, salt } = passData
      doc.hash = hash
      doc.salt = salt
      doc.createdAt = new Date().toISOString()
      delete doc.password

      if (!doc.password) { // eslint-disable-line
        const newUser = await this.users.insertOne(doc)

        return {
          statusCode: 201,
          data: newUser
        }
      }

      return {
        statusCode: 500,
        data: 'Error: password attribute can not be passed to database.'
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        data: error
      }
    }
  }

  async validate (username: string, password: string): Promise<APIResponse> {
    try {
      const auth = new Auth()
      const filter = { email: username }
      const user = await this.users.findOne(filter)
      if (user != null) {
        const validUser = auth.validatePassword(password, user.salt, user.hash)
        if (validUser) {
          return {
            statusCode: 200,
            data: user
          }
        }
        return {
          statusCode: 400,
          data: 'Login validation was unsuccseful'
        }
      }
      return {
        statusCode: 404,
        data: 'Could not locate user'
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: error
      }
    }
  }
}

export { User, UserPayload }
