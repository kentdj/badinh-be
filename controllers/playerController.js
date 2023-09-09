const Players = require('../models/Players')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Teams = require('../models/Teams');

const getAllPlayer = async (req, res) => {
  const data = await Players.findAndCountAll({
    include: [
      {
        model: Teams,
        as: 'team',
      },
    ]
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSinglePlayer = async (req, res) => {

  const condition = {}

  condition.where = {
    id: req.params.id,
  }

  condition.include = [
    {
      model: Teams,
      as: 'team',
    },
  ]

  const data = await Players.findOne(condition)

  if (!data) {
    throw new CustomError.NotFoundError(`No Player with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const createPlayer = async (req, res, next) => {

  const {
    team_id,
    first_name,
    last_name,
    date_of_birth,
    height,
    weight,
    image,
    avatar,
    position,
  } = req.body;


  if (
    !team_id ||
    !first_name ||
    !last_name ||
    !date_of_birth ||
    !height ||
    !weight) {
    throw new CustomError.BadRequestError('Pls provide Team info');
  }

  // const checkPlayer = await Players.findOne({
  //   where: { name }
  // });

  // if (checkPlayer) {
  //   throw new CustomError.BadRequestError('Team name already exists');
  // }

  const data = await Players.create({
    team_id,
    first_name,
    last_name,
    date_of_birth,
    height,
    weight,
    image,
    avatar,
    position,
  })
  res.status(StatusCodes.CREATED).json({ data });
}

const updatePlayer = async (req, res, next) => {

  const {
    team_id,
    first_name,
    last_name,
    date_of_birth,
    height,
    weight,
    image,
    avatar,
    position,
  } = req.body;


  if (
    !team_id ||
    !first_name ||
    !last_name ||
    !date_of_birth ||
    !height ||
    !weight) {
    throw new CustomError.BadRequestError('Pls provide Team info');
  }

  await Players.update({
    team_id,
    first_name,
    last_name,
    date_of_birth,
    height,
    weight,
    image,
    avatar,
    position,
  }, {
    where: { id: req.params.id }
  })

  const data = await Players.findOne({
    where: { id: req.params.id }
  })

  res.status(StatusCodes.CREATED).json({ data });
}


module.exports = {
  getAllPlayer,
  getSinglePlayer,
  createPlayer,
  updatePlayer
}