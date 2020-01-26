const bcrypt = require('bcryptjs');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

module.exports = {
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        return {
            password,
            hash,
        };
    },
    
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
};