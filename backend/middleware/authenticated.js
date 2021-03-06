const jwt = require('./../utils/jwt');


module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
  const token = ctx.headers.authorization.split(' ')[1];

  try {
    ctx.request.jwtPayload = jwt.validateToken(token);
  } catch (error) {
    ctx.throw(error.status || 403, error.text);
  }

  await next();
};