const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require('../utils')

const userAttributes = [
  'id',
  'email',
  'phone',
  'firstName',
  'lastName',
  'fullName',
  'nickName',
  'avatar',
  'dob',
  'role',
  'createdAt',
  'updatedAt'
]

const getAllUsers = async (req, res) => {
  const data = await User.findAndCountAll({
    attributes: userAttributes
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleUser = async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id },
    attributes: userAttributes
  })

  if (!data) {
    throw new CustomError.NotFoundError(`No user with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const showCurrentUser = async (req, res) => {
  const data = await User.findOne({
    where: { id: req.user.id },
    attributes: userAttributes
  })
  res.status(StatusCodes.OK).json({ user: data })
}

const updateUser = async (req, res) => {
  const { phone, firstName, lastName, nickName, avatar, dob } = req.body;

  await User.update({ phone, firstName, lastName, nickName, avatar, dob }, {
    where: { id: req.user.id }
  });

  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: userAttributes
  })

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ msg: "update success", user })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Pls provide password")
  }
  const user = await User.findOne({
    where: { id: req.user.id },
  })
  const isPasswordCorrect = await user.validPassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }

  await User.update({ password: newPassword }, {
    where: { id: req.user.id },
    individualHooks: true
  });

  res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
