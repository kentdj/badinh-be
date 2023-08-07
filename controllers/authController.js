const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const bcryptjs = require('bcryptjs');

const register = async (req, res, next) => {
  try {
    const { email, nickName, password, firstName, lastName } = req.body;

    const checkEmailExits = await User.findOne({
      where: { email: email }
    });
    console.log('🚀 ~ file: authController.js:10 ~ register ~ checkEmailExits:', checkEmailExits)

    if (checkEmailExits) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin

    const isFirstAccount = await User.count({}) === 0
    console.log('🚀 ~ file: authController.js:21 ~ register ~ isFirstAccount:', isFirstAccount)

    const role = isFirstAccount ? 'admin' : 'member'

    const newUser = await User.create({
      nickName, email, password, role, firstName, lastName
    })
    const tokenUser = createTokenUser(newUser)
    // attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({ newUser, tokenUser });
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req, res, next) => {
  res.send('verifyEmail')
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.BadRequestError("Pls provide email and password")
    }

    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.validPassword(password);

    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid credentials')
    }

    const tokenUser = createTokenUser(user)
    console.log('🚀 ~ file: authController.js:65 ~ login ~ tokenUser:', tokenUser)

    attachCookiesToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
}