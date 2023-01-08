import DB from './db.js'
import crypto from 'crypto'
import { ObjectID } from 'bson'


interface AuthData {
    hash?: string
    salt?: string
    error?: any
}

class Auth {

    constructor () {}

    setPassword(password: any): AuthData {
        try {
            const salt = crypto.randomBytes(16).toString('hex')
    
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 
                64, 'sha512').toString('hex')
    
            const passwordData = { hash: hash, salt: salt }
    
            return passwordData
        } catch (error) {
            console.error(error)
            return {
                hash: '',
                salt: ''
            }
        }
    }

    validatePassword(password: string, salt: string, hash: string): boolean {
        try {
            const validHash = crypto.pbkdf2Sync(password, salt, 1000,
                64, 'sha512').toString('hex')
            return validHash === hash
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export { Auth, AuthData }
