import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// SIGN-UP
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

// SIGN-IN
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...restOfData } = validUser._doc; //destructuring "password" and "_doc"

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 24 * 7),
      }) // expires after 7 days
      .status(200)
      .json(restOfData);
  } catch (error) {
    next(error);
  }
};

// GOOGLE-AUTH
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...restOfData } = user._doc;
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000 * 24 * 7),
        })
        .status(200)
        .json(restOfData);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        dp: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...restOfData } = newUser._doc;
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000 * 24 * 7),
        })
        .status(200)
        .json(restOfData);
    }
  } catch (error) {
    next(error);
  }
};

// SIGN-OUT
export const signout = (req, res) => {
  res
    .clearCookie('access_token')
    .status(200)
    .json('User signed out successfully!');
};
