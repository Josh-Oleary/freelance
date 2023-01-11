import { ObjectID } from 'bson'
import { APIResponse } from './Users.js'
import API from './API.js'

interface SocialData {
  platform: 'facebook' | 'linkedin' | 'github' | 'twitter' | 'instagram' | 'medium'
  platformURL: string
}

interface WorkHistoryData {
  summary: string
  showcaseURL: string
  title: string
}

export interface ProfileData {
  _user: ObjectID
  profilePic: string
  about: string
  socialLinks?: SocialData[]
  workHistory?: WorkHistoryData[]
  createdAt?: string
  updatedAt?: string
}

class Profile extends API {
  constructor () {
    super('profiles')
  }

  async create (userID: string, data: ProfileData): Promise<APIResponse> {
    try {
      const doc = data
      doc._user = new ObjectID(userID)
      doc.createdAt = new Date().toISOString()
      const newProfile = await this.api.insertOne(doc)
      console.log('New Profile: ', newProfile)
      return {
        statusCode: 201,
        data: newProfile
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

export default Profile
