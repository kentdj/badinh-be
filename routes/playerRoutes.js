const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllPlayer, getSinglePlayer, createPlayer, updatePlayer
} = require('../controllers/playerController');

router.route('/')
  .get(authenticateUser, getAllPlayer)
  .post([authenticateUser, authorizePermissions('admin')], createPlayer);

router.route('/:id')
  .get(authenticateUser, getSinglePlayer)
  .patch([authenticateUser, authorizePermissions('admin')], updatePlayer);

module.exports = router;