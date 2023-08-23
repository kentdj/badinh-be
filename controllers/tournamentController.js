const Tournaments = require('../models/Tournaments')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');

const getAllTournaments = async (req, res) => {
  const { } = req.body;
  const data = await Tournaments.findAndCountAll({
  })

  res.status(StatusCodes.OK).json({ data })
}

const getSingleTournament = async (req, res) => {

  const data = await Tournaments.findOne({
    where: { id: req.params.id },
  })

  if (!data) {
    throw new CustomError.NotFoundError(`No tournament with ${id}`)
  }

  res.status(StatusCodes.OK).json({ data })
}

const updateTournament = async (req, res) => {
  const { name,
    image,
    logo,
    start_date,
    end_dateob,
  } = req.body;


  const checkTournament = await Tournaments.findOne({
    where: { name }
  });

  if (checkTournament) {
    throw new CustomError.BadRequestError('Tournament name already exists');
  }

  await Tournaments.update({
    name,
    image,
    logo,
    start_date,
    end_dateob,
  }, {
    where: { id: req.params.id }
  });

  const tournament = await Tournaments.findOne({
    where: { id: req.params.id }
  })
  res.status(StatusCodes.OK).json({ msg: "update success", tournament })
}

const createTournament = async (req, res, next) => {

  const { name,
    description,
    image,
    logo,
    start_date,
    end_date } = req.body;


  if (!name ||
    !description ||
    !image ||
    !logo ||
    !start_date ||
    !end_date) {
    throw new CustomError.BadRequestError('Pls provide Tournament info');
  }

  const checkTournament = await Tournaments.findOne({
    where: { name }
  });

  if (checkTournament) {
    throw new CustomError.BadRequestError('Tournament name already exists');
  }

  const newTournament = await Tournaments.create({
    name,
    description,
    image,
    logo,
    start_date,
    end_date
  })
  // attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ newTournament });
}

module.exports = {
  getAllTournaments,
  getSingleTournament,
  updateTournament,
  createTournament,
}