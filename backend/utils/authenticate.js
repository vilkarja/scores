import {
    jwt
} from './utils';
import User from '../models/User';

export const authenticate = async (ctx, next) => {
    if (!(ctx.req.headers && ctx.req.headers.authorization)) {
        ctx.throw(400, 'You need to authenticate to access this resource')
    }
    var header = ctx.req.headers.authorization.split(' ');
    var token = header[1];
    var results;

    try {
        results = jwt.validateToken(token);

        const user = await User.query().where({
            id: parseInt(results.user)
        }).first();

        if (user) {
            ctx.req.body.userId = user.id;
            await next();
        }

    } catch (err) {
        throw (err);
    }
}