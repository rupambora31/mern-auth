import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) //token not valid
    return next(errorHandler(401, 'You are not authenticated, access denied!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Token not valid.'));

    req.user = user;
    next();
  });
};
