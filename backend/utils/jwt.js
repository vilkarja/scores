const jwt = require('jsonwebtoken');

const HOUR = 3600;
const SECRET = process.env.JWT_SIGNING_SECRET || 'super_secret_key';

const getSecondsNow = () => Math.floor(new Date().getTime() / 1000);


module.exports = {
    issueToken(user, validFor = HOUR) {
        const iat = getSecondsNow();
        const exp = iat + Math.floor(validFor);
        const payload = {
            user,
            iat,
            exp,
        };
        return jwt.sign(payload, SECRET);
    },

    validateToken(token) {
        return jwt.verify(token, SECRET);
    }
}