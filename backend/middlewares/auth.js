const { NODE_ENV, SECRET_KEY } = process.env;

const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorizedError'); // 401

// module.exports = (req, res, next) => {
//  const { token } = req.cookies;
//  if (!token) {
//    return next(new UnauthorizedError('Необходима авторизация'));
//  }

//  let payload;

//  try {
//    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'most-secret-key');
//  } catch (err) {
//    return next(new UnauthorizedError('Необходима авторизация'));
//  }
//  req.user = payload;
//  return next();
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'most-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
