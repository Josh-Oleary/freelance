var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectID } from 'bson';
import API from './API.js';
class Profile extends API {
    constructor() {
        super('profiles');
    }
    create(userID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = data;
                doc._user = new ObjectID(userID);
                doc.createdAt = new Date().toISOString();
                const newProfile = yield this.api.insertOne(doc);
                console.log('New Profile: ', newProfile);
                return {
                    statusCode: 201,
                    data: newProfile
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
export default Profile;
