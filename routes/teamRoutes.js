const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllTeams, getSingleTeam, createTeam, updateTeam } = require('../controllers/teamController');

router.route('/')
  .get(authenticateUser, getAllTeams)
  .post([authenticateUser, authorizePermissions('admin')], createTeam);
router.route('/:id')
  .get(authenticateUser, getSingleTeam)
  .patch([authenticateUser, authorizePermissions('admin')], updateTeam);

module.exports = router;