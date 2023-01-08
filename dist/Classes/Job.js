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
class Job {
    constructor(userID = undefined) {
        this.collection = 'jobs';
        this.db = new DB(this.collection);
        this.client = this.db.client;
        this.jobs = this.client.db().collection(this.collection);
        this.userID = userID;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = data;
                doc._user = new ObjectID(this.userID);
                doc.createdAt = new Date().toISOString();
                doc.status = 'review';
                const newJob = yield this.jobs.insertOne(doc);
                return {
                    statusCode: 201,
                    data: newJob
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
    update() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    fetchOne() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteOne() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
export default Job;
