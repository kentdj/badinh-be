const Games = require('../models/Games')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Teams = require('../models/Teams');
const Tournaments = require('../models/Tournaments');

const getAllGame = async (req, res) => {
  const data = await Games.findAndCountAll({
    include: [
      {
        model: Tournaments,
        as: 'tournament',
      },
      {
        model: Teams,
        as: 'homeTeam',
      },
      {
        model: Teams,
        as: 'awayTeam',
      },
    ]
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleGame = async (req, res) => {

  const condition = {}

  condition.where = {
    id: req.params.id,
  }

  condition.include = [
    {
      model: Tournaments,
      as: 'tournament',
    },
    {
      model: Teams,
      as: 'homeTeam',
    },
    {
      model: Teams,
      as: 'awayTeam',
    },
  ]

  const data = await Games.findOne(condition)

  if (!data) {
    throw new CustomError.NotFoundError(`No Game with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const createPlayer = async (req, res, next) => {

  const {
    tournament_id,
    home_team_id,
    away_team_id,
    home_team_score,
    away_team_score,
    date,
    venue,
  } = req.body;


  if (
    !tournament_id ||
    !home_team_id ||
    !away_team_id ||
    !home_team_score ||
    !away_team_score ||
    !date ||
    !venue) {
    throw new CustomError.BadRequestError('Pls provide Game info');
  }

  // const checkPlayer = await Games.findOne({
  //   where: { name }
  // });

  // if (checkPlayer) {
  //   throw new CustomError.BadRequestError('Team name already exists');
  // }

  const data = await Games.create({
    tournament_id,
    home_team_id,
    away_team_id,
    home_team_score,
    away_team_score,
    date,
    venue,
  })
  res.status(StatusCodes.CREATED).json({ data });
}


const updatePlayer = async (req, res, next) => {

  const {
    tournament_id,
    home_team_id,
    away_team_id,
    home_team_score,
    away_team_score,
    date,
    venue,
  } = req.body;


  // if (
  //   !tournament_id ||
  //   !home_team_id ||
  //   !away_team_id ||
  //   !home_team_score ||
  //   !away_team_score ||
  //   !date ||
  //   !venue) {
  //   throw new CustomError.BadRequestError('Pls provide Game info');
  // }

  // const checkPlayer = await Games.findOne({
  //   where: { name }
  // });

  // if (checkPlayer) {
  //   throw new CustomError.BadRequestError('Team name already exists');
  // }

  await Games.update({
    tournament_id,
    home_team_id,
    away_team_id,
    home_team_score,
    away_team_score,
    date,
    venue,
  }, {
    where: { id: req.params.id }
  })

  const data = await Games.findOne({
    where: { id: req.params.id }
  })
  res.status(StatusCodes.OK).json({ data });
}

module.exports = {
  getAllGame,
  getSingleGame,
  createPlayer,
  updatePlayer
}