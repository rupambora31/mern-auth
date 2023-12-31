import User from '../models/User.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working',
  });
};

//UPDATE-USER
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          dp: req.body.dp,
        },
      },
      { new: true } //to view updated data
    );
    const { password, ...rest } = updatedUser._doc; //separating the password from rest of the data(security)
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// DELETE-USER
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted successfuly!');
  } catch (error) {
    next(error);
  }
};
