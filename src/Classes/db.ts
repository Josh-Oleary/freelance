import { MongoClient } from 'mongodb'

class DB {
  url: string = 'mongodb://localhost:27017'
  client: MongoClient = new MongoClient(this.url)
  dbName: string = 'freelance'
  collection: string | undefined

  constructor (collectionName: string | undefined = undefined) {
    this.collection = collectionName
  }

  async connect (): Promise<any> {
    try {
      await this.client.connect()
      await this.client.db(this.collection).command({ ping: 1 })
      console.log('DB server connection: Success')
      return this.client
    } catch (error) {
      console.error(error)
    }
  }

  async close (): Promise<void> {
    this.client.close()
      .catch((error) => {
        console.error(error)
      })
  }
}

export default DB
