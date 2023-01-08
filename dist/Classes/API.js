var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectID } from "bson";
import DB from "./db.js";
class API extends DB {
    constructor(collection) {
        super(collection);
        this.db = new DB(this.collection);
        this.client = this.db.client;
        this.api = this.client.db().collection(this.collection);
        this.collection = collection.toString();
    }
    create(userID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                statusCode: 200,
                data: 'Placeholder'
            };
        });
    }
    update(userID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(userID);
                data.updateAt = new Date().toISOString();
                const doc = { $set: data };
                const filter = { _user: id };
                yield this.api.updateOne(filter, doc);
                const response = yield this.api.findOne(filter);
                return {
                    statusCode: 201,
                    data: response
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
    fetchMany() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursor = this.api.find();
                const response = yield cursor.toArray();
                return {
                    statusCode: 200,
                    data: response
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
    fetchOne(filterID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(filterID);
                const filter = { _user: id };
                const response = yield this.api.findOne(filter);
                return {
                    statusCode: 200,
                    data: response
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
    delete(filterID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectID(filterID);
                const doc = { _user: id };
                const response = yield this.api.deleteOne(doc);
                if (response.deletedCount > 0) {
                    return {
                        statusCode: 204,
                        data: 'Document Deleted'
                    };
                }
                return {
                    statusCode: 400,
                    data: 'Delete Operation Failed'
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
}
export default API;
