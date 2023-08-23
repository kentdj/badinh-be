const Players = require('../models/Players')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllPlayer = async (req, res) => {
  const data = await Players.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

module.exports = {
  getAllPlayer
}