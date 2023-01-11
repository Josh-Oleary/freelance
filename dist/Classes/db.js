var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
class DB {
    constructor(collectionName = undefined) {
        this.url = 'mongodb://localhost:27017';
        this.client = new MongoClient(this.url);
        this.dbName = 'freelance';
        this.collection = collectionName;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                yield this.client.db(this.collection).command({ ping: 1 });
                console.log('DB server connection: Success');
                return this.client;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.close()
                .catch((error) => {
                console.error(error);
            });
        });
    }
}
export default DB;
