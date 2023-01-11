import { ObjectID } from 'bson'

import DB from './db.js'
import { APIResponse } from './Users.js'

/* eslint-disable @typescript-eslint/no-floating-promises */

class API extends DB {
  collection: string

  constructor (collection: string) {
    super(collection)
    this.collection = collection.toString()
  }

  db = new DB(this.collection)
  client = this.db.client
  api = this.client.db().collection(this.collection)

  async update (filterID: string, data: any): Promise<APIResponse> {
    try {
      const id = new ObjectID(filterID)
      data.updateAt = new Date().toISOString()
      const doc = { $set: data }
      const filter = { _id: id }
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
    } finally {
      this.db.close()
    }
  }

  async fetchMany (): Promise<APIResponse> {
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
    } finally {
      this.db.close()
    }
  }

  async fetchOne (filterID: string): Promise<APIResponse> {
    try {
      const id = new ObjectID(filterID)
      const filter = { _id: id }
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
    } finally {
      this.db.close()
    }
  }

  async delete (filterID: string): Promise<APIResponse> {
    try {
      const id = new ObjectID(filterID)
      const doc = { _id: id }
      const response = await this.api.deleteOne(doc)

      if (response.deletedCount > 0) {
        return {
          statusCode: 204,
          data: { status: 'Deleted' }
        }
      }

      return {
        statusCode: 400,
        data: { status: 'Delete operation failed' }
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
}

/* eslint-disable @typescript-eslint/no-floating-promises */

export default API
