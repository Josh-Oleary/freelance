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
import { ObjectID } from 'bson';
import { Auth } from './Authentication.js';
class User extends Auth {
    constructor() {
        super();
        this.collection = 'users';
        this.db = new DB(this.collection);
        this.client = this.db.client;
        this.users = this.client.db().collection(this.collection);
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = data;
                const { hash, salt } = this.setPassword(doc.password);
                doc.hash = hash;
                doc.salt = salt;
                doc.createdAt = new Date().toISOString();
                delete doc.password;
                if (!doc.password) {
                    const newUser = yield this.users.insertOne(doc);
                    console.log('New User: ', newUser);
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
            finally {
                this.db.close();
            }
        });
    }
    updateUser(userID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(userID);
                data.updatedAt = new Date().toISOString();
                const doc = { $set: data };
                const filter = { _id: id };
                yield this.users.updateOne(filter, doc);
                const user = yield this.users.findOne(filter);
                return {
                    statusCode: 200,
                    data: user
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    data: error
                };
            }
            finally {
                this.db.close();
            }
        });
    }
    fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursor = this.users.find();
                const users = [];
                if ((yield cursor.count()) === 0) {
                    console.warn('No User Documents Found');
                }
                yield cursor.forEach((c) => {
                    users.push(c);
                });
                return {
                    statusCode: 200,
                    data: users
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    data: error
                };
            }
            finally {
                this.db.close();
            }
        });
    }
    fetchSingleUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(userID);
                const filter = { _id: id };
                const user = yield this.users.findOne(filter);
                return {
                    statusCode: 200,
                    data: user
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    data: error
                };
            }
            finally {
                this.db.close();
            }
        });
    }
    deleteUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(userID);
                const doc = { _id: id };
                const deleteResult = yield this.users.deleteOne(doc);
                if (deleteResult.deletedCount > 0) {
                    return {
                        statusCode: 204,
                        data: 'Document Deleted'
                    };
                }
                return {
                    statusCode: 400,
                    data: 'Operation Failed'
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    data: error
                };
            }
            finally {
                this.db.close();
            }
        });
    }
    validateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { email: username };
                const user = yield this.users.findOne(filter);
                if (user) {
                    const validUser = this.validatePassword(password, user.salt, user.hash);
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
