const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions, } = require('../middleware/authentication')

const { getAllTournaments, getSingleTournament, createTournament, updateTournament } = require('../controllers/tournamentController');

router.route('/')
  .get(authenticateUser, getAllTournaments)
  .post([authenticateUser, authorizePermissions('admin')], createTournament);
router.route('/:id').get(authenticateUser, getSingleTournament).patch([authenticateUser, authorizePermissions('admin')], updateTournament);

module.exports = router;