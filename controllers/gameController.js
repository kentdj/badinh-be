const Games = require('../models/Games')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllGame = async (req, res) => {
  const data = await Games.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

module.exports = {
  getAllGame
}