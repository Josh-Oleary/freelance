import DB from './db.js'
import { ObjectID } from 'bson'
import { AuthData, Auth }from './Authentication.js'

interface APIResponse {
    statusCode: number
    data: any
}

interface UserPayload {
    portfolioID?: string | null;
    firstName: string;
    lastName: string;
    country: string;
    skills: string[];
    jobHistory?: string[];
    rating?: number;
    verified: boolean;
    createdAt: Date | string;
    updatedAt?: Date;
    lastLogin?: Date;
    payments?: string[];
    reviews?: object[];
    email: string;
    password?: string
    hash: string
    salt: string
    userType: 'employer' | 'employee' | 'agency' | 'admin';
}

type UserSearchFilter = {
    _id: object
}

class User extends Auth {
    collection = 'users'
    db = new DB(this.collection)
    client = this.db.client
    users = this.client.db().collection(this.collection)
    
    constructor () {
        super()
    }

    async createUser (data: UserPayload): Promise<APIResponse> {  
        try {
            let doc = data
            const { hash, salt } = this.setPassword(doc.password)
            doc.hash = hash
            doc.salt = salt
            doc.createdAt = new Date().toISOString()
            delete doc.password
            if (!doc.password) {
                const newUser = await this.users.insertOne(doc)
                console.log('New User: ', newUser)
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
        } finally {
            this.db.close()
        }
    }

    async updateUser (userID: string, data: any): Promise<APIResponse> {
        try {
            const id = new ObjectID(userID)
            data.updatedAt = new Date().toISOString()
            const doc = { $set: data }
            const filter: UserSearchFilter = { _id: id } 
            await this.users.updateOne(filter, doc)
            const user = await this.users.findOne(filter)
            return {
                statusCode: 200,
                data: user

            }
        } catch (error) {
            return {
                statusCode: 500,
                data: error
            }
        } finally {
            this.db.close()
        }
    }

    async fetchUsers (): Promise<APIResponse>  {
        try {
            const cursor = this.users.find()
            const users: object[] = []
            
            if ((await cursor.count()) === 0) {
                console.warn('No User Documents Found')
            }

            await cursor.forEach((c) => {
                users.push(c)
            })

            return {
                statusCode: 200,
                data: users
            }
            
        } catch (error) {
            return {
                statusCode: 500,
                data: error
            }
        } finally {
            this.db.close()
        }
    }

    async fetchSingleUser (userID: string): Promise<APIResponse>  {
        try {
            const id = new ObjectID(userID)
            const filter = { _id: id }
            const user = await this.users.findOne(filter)

            return {
                statusCode: 200,
                data: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: error
            }
        } finally {
            this.db.close()
        }
    }

    async deleteUser (userID: string): Promise<APIResponse>  {
        try {
            const id = new ObjectID(userID)
            const doc = { _id: id}
            const deleteResult = await this.users.deleteOne(doc)

            if (deleteResult.deletedCount > 0) {
                return {
                    statusCode: 204,
                    data: 'Document Deleted'
                }
            }

            return {
                statusCode: 400,
                data: 'Operation Failed'
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: error
            }
        } finally {
            this.db.close()
        }
    }

    async validateUser (username: string, password: string): Promise<APIResponse> {
        try {
            const filter = { email: username }
            const user = await this.users.findOne(filter)
            if (user) {
                const validUser = this.validatePassword(password, user.salt, user.hash)
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