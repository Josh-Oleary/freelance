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
class Profile {
    constructor(userID) {
        this.collection = 'profiles';
        this.db = new DB(this.collection);
        this.client = this.db.client;
        this.profiles = this.client.db().collection(this.collection);
        this.userID = userID;
    }
    createProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc = data;
                doc.userID = this.userID;
                const newProfile = yield this.profiles.insertOne(doc);
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
            finally {
                this.db.close();
            }
        });
    }
    updateProfile() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    fetchProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    fetchSingleProfile() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteProfile() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
export default Profile;
