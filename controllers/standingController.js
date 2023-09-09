const Standings = require('../models/Standings')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Tournaments = require('../models/Tournaments');
const Teams = require('../models/Teams');

const getAllStanding = async (req, res) => {
  const data = await Standings.findAndCountAll({
    include: [
      {
        model: Tournaments,
        as: 'tournament'
      },
      {
        model: Teams,
        as: 'team'
      }
    ]
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleStanding = async (req, res) => {

  const condition = {}

  condition.where = {
    id: req.params.id,
  }

  condition.include = [
    {
      model: Tournaments,
      as: 'tournament'
    },
    {
      model: Teams,
      as: 'team'
    }
  ]

  const data = await Standings.findOne(condition)

  if (!data) {
    throw new CustomError.NotFoundError(`No Standings with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const createStanding = async (req, res, next) => {

  const {
    tournament_id,
    team_id,
    matches_played,
    matches_won,
    matches_lost,
    points_for,
    points_against,
  } = req.body;


  if (
    !team_id ||
    !tournament_id) {
    throw new CustomError.BadRequestError('Pls provide team_id or tournament_id info');
  }

  const checkStanding = await Standings.findOne({
    where: {
      tournament_id,
      team_id
    }
  });

  if (checkStanding) {
    throw new CustomError.BadRequestError('Player Standing already exists');
  }

  const data = await Standings.create({
    tournament_id,
    team_id,
    matches_played,
    matches_won,
    matches_lost,
    points_for,
    points_against,
  })

  res.status(StatusCodes.CREATED).json({ data });
}

const updateStanding = async (req, res, next) => {

  const {
    matches_played,
    matches_won,
    matches_lost,
    points_for,
    points_against,
  } = req.body;

  const checkStanding = await Standings.findOne({
    where: { id: req.params.id }
  })

  if (!checkStanding) {
    throw new CustomError.NotFoundError(`No Standings with ${id}`)
  }


  await Standings.update({
    matches_played,
    matches_won,
    matches_lost,
    points_for,
    points_against,
  }, {
    where: { id: req.params.id }
  })

  const condition = {}


  condition.where = {
    id: req.params.id,
  }

  condition.include = [
    {
      model: Tournaments,
      as: 'tournament'
    },
    {
      model: Teams,
      as: 'team'
    }
  ]

  const data = await Standings.findOne(condition)

  if (!data) {
    throw new CustomError.NotFoundError(`No Standings with ${id}`)
  }

  res.status(StatusCodes.CREATED).json({ data });
}

module.exports = {
  getAllStanding,
  getSingleStanding,
  createStanding,
  updateStanding
}