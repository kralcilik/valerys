import User from '../models/userModule.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
//@desc Auth the user & get a token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else res.status(401);
    throw new Error('invalid password');
  } else {
    console.log('no such user');
    res.status(401);
    throw new Error('invalid email');
  }
});

//@desc get all users
//@route GET /api/users
//@access private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) res.json(users);
  else res.json({ msg: 'no users' });
});

//@desc register new user
//@route POST /api/users
//@access public

const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('user already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
  });
  if (user) {
    // 201 means something new created sucesffilyy
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

//@desc get user profile
//@route GET /api/users/profile
//@access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

//@desc update user profile
//@route PUT /api/users/profile
//@access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    console.log('phone: ' + req.body.phone);
    user.name = req.body.name || user.name;
    user.phone = req.body.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

//@desc delete a user
//@route DELETE /api/users/:id
//@access private/admin

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});
export {
  authUser,
  getUsers,
  createNewUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};

// //@desc delete a user
// //@route DELETE /api/users/:id
// //@access private/admin

// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     await user.remove();
//     res.json({ message: 'User removed' });
//   } else {
//     res.status(404);
//     throw new Error('user not found');
//   }
// });

// //@desc get user by id
// //@route GET /api/users/:id
// //@access private/admin

// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password');
//   if (user) res.json(user);
//   else {
//     res.status(404);
//     throw new Error('user not found');
//   }
// });

// //@desc update any user profile
// //@route PUT /api/users/:id
// //@access private/admin

// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   console.log('body: ' + req.body);
//   if (user) {
//     console.log('isadmin var mi: ' + req.body.name);
//     console.log('isadmin var mi: ' + req.body.isAdmin);
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin || user.isAdmin;
//     // for (const key in req.body) {
//     //   console.log('bakale: ' + body[key]);
//     // }
//     console.log('user got found');

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('user not found');
//   }
// });
