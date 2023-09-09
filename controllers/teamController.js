const Teams = require('../models/Teams')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const getAllTeams = async (req, res) => {
  const data = await Teams.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleTeam = async (req, res) => {

  const data = await Teams.findOne({
    where: { id: req.params.id },
  })

  if (!data) {
    throw new CustomError.NotFoundError(`No Team with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const updateTeam = async (req, res) => {
  const { name,
    country,
    image,
    logo,
    coach,
    established_year
  } = req.body;


  const checkTeam = await Teams.findOne({
    where: { name }
  });

  if (checkTeam) {
    throw new CustomError.BadRequestError('Team name already exists');
  }

  await Teams.update({
    name,
    country,
    image,
    logo,
    coach,
    established_year
  }, {
    where: { id: req.params.id }
  });

  const data = await Teams.findOne({
    where: { id: req.params.id }
  })
  res.status(StatusCodes.OK).json({ msg: "update success", data })
}

const createTeam = async (req, res, next) => {

  const { name,
    country,
    image,
    logo,
    coach,
    established_year
  } = req.body;


  if (!name ||
    !country ||
    !image ||
    !logo ||
    !coach ||
    !established_year) {
    throw new CustomError.BadRequestError('Pls provide Team info');
  }

  const checkTeam = await Teams.findOne({
    where: { name }
  });

  if (checkTeam) {
    throw new CustomError.BadRequestError('Team name already exists');
  }

  const data = await Teams.create({
    name,
    country,
    image,
    logo,
    coach,
    established_year
  })
  res.status(StatusCodes.CREATED).json({ data });
}

module.exports = {
  getAllTeams,
  getSingleTeam,
  updateTeam,
  createTeam
}