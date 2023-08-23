const Stats = require('../models/Stats')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllStats = async (req, res) => {
  const data = await Stats.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

module.exports = {
  getAllStats
}