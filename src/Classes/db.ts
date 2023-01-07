import { MongoClient } from 'mongodb'

class DB {
    url: string = 'mongodb://localhost:27017'
    client: MongoClient = new MongoClient(this.url)
    dbName: string = 'freelance'
    collection: string

    constructor (collectionName: string) {
        this.collection = collectionName
    }

    async connect () {
        try {
            await this.client.connect()
            await this.client.db(this.collection).command({ping: 1})
            console.log('DB server connection: Success')
            return this.client
        } catch (error) {
            console.error(error)
        }
    }
    async close () {
        this.client.close()
    }

}

export default DB