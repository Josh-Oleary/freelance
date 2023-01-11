import crypto from 'crypto';
class Auth {
    setPassword(password) {
        try {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            const passwordData = { hash, salt };
            return passwordData;
        }
        catch (error) {
            console.error(error);
            return {
                hash: '',
                salt: ''
            };
        }
    }
    validatePassword(password, salt, hash) {
        try {
            const validHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            return validHash === hash;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
export { Auth };
