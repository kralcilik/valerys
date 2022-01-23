import jwt from 'jsonwebtoken';
import User from '../models/userModule.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const headerToken = req.header('hotel-token');
  console.log(headerToken);
  if (headerToken && headerToken.startsWith('Bearer')) {
    console.log('token got found');
    try {
      token = headerToken.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      //next ten sonra gelen function bu alttaki satir
      //sayesinde user i define olmus sekilde olcak
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('not authorized token deadddd');
    }
  }

  if (!headerToken) {
    res.status(401);
    throw new Error('not authorized no token');
  }

  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('not auth as admin');
  }
};

export { protect, admin };
