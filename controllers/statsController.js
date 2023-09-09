const Stats = require('../models/Stats')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Games = require('../models/Games');
const Players = require('../models/Players');

const getAllStats = async (req, res) => {
  const data = await Stats.findAndCountAll({
    include: [
      {
        model: Games,
        as: 'game'
      },
      {
        model: Players,
        as: 'player'
      }
    ]
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleStats = async (req, res) => {

  const condition = {}

  condition.where = {
    id: req.params.id,
  }

  condition.include = [
    {
      model: Games,
      as: 'game'
    },
    {
      model: Players,
      as: 'player'
    }
  ]

  const data = await Stats.findOne(condition)

  if (!data) {
    throw new CustomError.NotFoundError(`No stats with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const createStats = async (req, res, next) => {

  const {
    game_id,
    player_id,
    points,
    assists,
    offensiveRebounds,
    defensiveRebounds,
    steals,
    blocks,
    turnOvers,
    personalFouls,
    fieldGoalsMade,
    fieldGoalsAttemted,
    threePointMade,
    threePointAttemted,
    freeThrowMade,
    freeThrowAttemted,
  } = req.body;


  if (
    !game_id ||
    !player_id) {
    throw new CustomError.BadRequestError('Pls provide game_id or player_id info');
  }

  const checkStats = await Stats.findOne({
    where: {
      game_id,
      player_id
    }
  });

  if (checkStats) {
    throw new CustomError.BadRequestError('Player Stats already exists');
  }

  const data = await Stats.create({
    game_id,
    player_id,
    points: points ?? 0,
    assists: assists ?? 0,
    offensiveRebounds: offensiveRebounds ?? 0,
    defensiveRebounds: defensiveRebounds ?? 0,
    steals: steals ?? 0,
    blocks: blocks ?? 0,
    turnOvers: turnOvers ?? 0,
    personalFouls: personalFouls ?? 0,
    fieldGoalsMade: fieldGoalsMade ?? 0,
    fieldGoalsAttemted: fieldGoalsAttemted ?? 0,
    threePointMade: threePointMade ?? 0,
    threePointAttemted: threePointAttemted ?? 0,
    freeThrowMade: freeThrowMade ?? 0,
    freeThrowAttemted: freeThrowAttemted ?? 0,
  })

  res.status(StatusCodes.CREATED).json({ data });
}

const updateStats = async (req, res, next) => {

  const {
    game_id,
    player_id,
    points,
    assists,
    offensiveRebounds,
    defensiveRebounds,
    steals,
    blocks,
    turnOvers,
    personalFouls,
    fieldGoalsMade,
    fieldGoalsAttemted,
    threePointMade,
    threePointAttemted,
    freeThrowMade,
    freeThrowAttemted,
  } = req.body;
  console.log('🚀 ~ file: statsController.js:134 ~ updateStats ~ req.body:', req.body)



  const checkStats = await Stats.findOne({
    where: { id: req.params.id }
  });

  if (!checkStats) {
    throw new CustomError.BadRequestError('Stats not found');
  }
  // if (
  //   !game_id ||
  //   !player_id) {
  //   throw new CustomError.BadRequestError('Pls provide game_id or player_id info');
  // }

  // const checkStats = await Stats.findOne({
  //   where: {
  //     game_id,
  //     player_id
  //   }
  // });

  // if (checkStats) {
  //   throw new CustomError.BadRequestError('Player Stats already exists');
  // }

  await Stats.update({
    points,
    assists,
    offensiveRebounds,
    defensiveRebounds,
    steals,
    blocks,
    turnOvers,
    personalFouls,
    fieldGoalsMade,
    fieldGoalsAttemted,
    threePointMade,
    threePointAttemted,
    freeThrowMade,
    freeThrowAttemted,
  }, {
    where: { id: req.params.id }
  })

  const data = await Stats.findOne({
    where: { id: req.params.id }
  })
  res.status(StatusCodes.OK).json({ data });
}

module.exports = {
  getAllStats,
  getSingleStats,
  createStats,
  updateStats
}