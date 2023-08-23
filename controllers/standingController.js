const Standings = require('../models/Standings')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllStanding = async (req, res) => {
  const data = await Standings.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

module.exports = {
  getAllStanding
}