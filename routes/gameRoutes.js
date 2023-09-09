const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllGame,
  getSingleGame,
  createPlayer,
  updatePlayer
} = require('../controllers/gameController');

router.route('/')
  .get(authenticateUser, getAllGame)
  .post([authenticateUser, authorizePermissions('admin')], createPlayer);

router.route('/:id')
  .get(authenticateUser, getSingleGame)
  .patch([authenticateUser, authorizePermissions('admin')], updatePlayer);

module.exports = router;