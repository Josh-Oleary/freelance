import DB from './db.js'
import { ObjectID } from 'bson'
import { UserPayload, User, APIResponse, UserSearchFilter } from './Users.js'
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
    userID: string,
    profilePic: string,
    about: string,
    socialLinks?: SocialData[]
    workHistory?: WorkHistoryData[]
    createdAt: string
    updatedAt: string
}

interface ProfileClass {
    collection: 'profiles'
    db: any
    client: any
    profiles: any
    userID: string
}

// export interface ProfileResult {
//     statusCode: number
//     data?: any | undefined
// }

class Profile extends API {
    // collection = 'profiles'
    // db = new DB(this.collection)
    // client = this.db.client
    // profiles = this.client.db().collection(this.collection)

    constructor () {
        super('profiles')
    }

    async create (userID: string, data: any): Promise<APIResponse> {
        try {
            let doc = data
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
        } finally {
            this.db.close()
        }
    }

    // async update (data: any): Promise<APIResponse> {
    //     try {
    //         const id = new ObjectID(this.userID)
    //         data.updatedAt = new Date().toISOString()
    //         const doc = { $set: data }
    //         const filter: UserSearchFilter = { _user: id }
    //         await this.profiles.updateOne(filter, doc)
    //         const profile = await this.profiles.findOne(filter)
    //         return {
    //             statusCode: 201,
    //             data: profile
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         return {
    //             statusCode: 500,
    //             data: error
    //         }
    //     } finally {
    //         this.db.close()
    //     }
    // }

    // async fetchMany (): Promise<APIResponse> {
    //     try {
    //         const cursor = this.profiles.find()
    //         const profiles = await cursor.toArray()

    //         return {
    //             statusCode: 200,
    //             data: profiles
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         return {
    //             statusCode: 500,
    //             data: error
    //         }
    //     } finally {
    //         this.db.close()
    //     }
    // }

    // async fetchOne (): Promise<APIResponse> {
    //     try {
    //         const id = new ObjectID(this.userID)
    //         const filter = { _user: id }
    //         const profile = await this.profiles.findOne(filter)

    //         return {
    //             statusCode: 200,
    //             data: profile
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         return {
    //             statusCode: 500,
    //             data: error
    //         }
    //     } finally {
    //         this.db.close()
    //     }
    // }

    // async delete () {
    //     try {
    //         const id = new ObjectID(this.userID)
    //         const doc = { _user: id }
    //         const deleteResult = await this.profiles.deleteOne(doc)
            
    //         if (deleteResult.deletedCount > 0) {
    //             return {
    //                 statusCode: 204,
    //                 data: 'Document Deleted'
    //             }
    //         }

    //         return {
    //             statusCode: 400,
    //             data: 'Operation Failed'
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         return {
    //             statusCode: 500,
    //             data: error
    //         }
    //     }
    // }
}

export default Profile