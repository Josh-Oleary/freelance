import { ObjectID } from "bson"
import { CURSOR_FLAGS } from "mongodb"
import DB from "./db.js"
import { APIResponse } from "./Users.js"

class API extends DB {
    collection: string

    constructor (collection: string) {
        super(collection)
        this.collection = collection.toString()
    }

    db = new DB(this.collection)
    client = this.db.client
    api = this.client.db().collection(this.collection)

    async create (userID: string, data: any): Promise<APIResponse> {
        return {
            statusCode: 200,
            data: 'Placeholder'
        }
    }

    async update (userID: string, data: any) {
        try {
            const id = new ObjectID(userID)
            data.updateAt = new Date().toISOString()
            const doc = { $set: data }
            const filter = { _user: id }
            await this.api.updateOne(filter, doc)
            const response = await this.api.findOne(filter)
            return {
                statusCode: 201,
                data: response
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                data: error
            }
        }
    }

    async fetchMany () {
        try {
            const cursor = this.api.find()
            const response = await cursor.toArray()

            return {
                statusCode: 200,
                data: response
            }
            
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                data: error
            }
        }

    }

    async fetchOne (filterID: string) {
        try {
            const id = new ObjectID(filterID)
            const filter = { _user: id }
            const response = await this.api.findOne(filter)

            return {
                statusCode: 200,
                data: response
            }
            
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                data: error
            }
        }

    }

    async delete (filterID: string) {
        try {
            const id = new ObjectID(filterID)
            const doc = { _user: id }
            const response = await this.api.deleteOne(doc)

            if (response.deletedCount > 0) {
                return {
                    statusCode: 204,
                    data: 'Document Deleted'
                }
            }

            return {
                statusCode: 400,
                data: 'Delete Operation Failed'
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

export default API