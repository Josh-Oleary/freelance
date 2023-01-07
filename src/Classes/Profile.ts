import DB from './db.js'
import { ObjectID } from 'bson'
import { UserPayload } from './Users.js'

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
    userID: string,
    profilePic: string,
    about: string,
    socialLinks?: SocialData[]
    workHistory?: WorkHistoryData[]
    createdAt: string
    updatedAt: string
}

class Profile {
    collection = 'profiles'
    db = new DB(this.collection)
    client = this.db.client
    profiles = this.client.db().collection(this.collection)
    userID: string

    constructor (userID: string) {
        this.userID = userID
    }

    async createProfile (data: ProfileData) {
        try {
            let doc = data
            doc.userID = this.userID
            const newProfile = await this.profiles.insertOne(doc)
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
        } finally {
            this.db.close()
        }
    }

    async updateProfile () {

    }

    async fetchProfiles () {

    }

    async fetchSingleProfile () {

    }

    async deleteProfile () {

    }
}

export default Profile