const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { CustomError } = require('../errors')



const getAllUsers = async (req, res) => {
  const { email, nickName, password } = req.body;
  console.log('🚀 ~ file: userController.js:9 ~ getAllUsers ~ req.body:', req.body)



  res.send('getAllUsers')
}

const getSingleUser = async (req, res) => {
  res.send('getSingleUser')
}

const showCurrentUser = async (req, res) => {
  res.send('showCurrentUser')
}

const updateUser = async (req, res) => {
  res.send('updateUser')
}

// const updateUserPassword = async (req, res) => {
//   res.send('updateUserPassword')
// }

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
