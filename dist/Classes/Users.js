var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DB from './db.js';
import { Auth } from './Authentication.js';
import API from './API.js';
class User extends API {
    constructor() {
        super('users');
        this.collection = 'users';
        this.db = new DB(this.collection);
        this.client = this.db.client;
        this.users = this.client.db().collection(this.collection);
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new Auth();
                const doc = data;
                const passData = auth.setPassword(doc.password);
                const { hash, salt } = passData;
                doc.hash = hash;
                doc.salt = salt;
                doc.createdAt = new Date().toISOString();
                delete doc.password;
                if (!doc.password) { // eslint-disable-line
                    const newUser = yield this.users.insertOne(doc);
                    return {
                        statusCode: 201,
                        data: newUser
                    };
                }
                return {
                    statusCode: 500,
                    data: 'Error: password attribute can not be passed to database.'
                };
            }
            catch (error) {
                console.error(error);
                return {
                    statusCode: 500,
                    data: error
                };
            }
        });
    }
    validate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new Auth();
                const filter = { email: username };
                const user = yield this.users.findOne(filter);
                if (user != null) {
                    const validUser = auth.validatePassword(password, user.salt, user.hash);
                    if (validUser) {
                        return {
                            statusCode: 200,
                            data: user
                        };
                    }
                    return {
                        statusCode: 400,
                        data: 'Login validation was unsuccseful'
                    };
                }
                return {
                    statusCode: 404,
                    data: 'Could not locate user'
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    data: error
                };
            }
        });
    }
}
export { User };
