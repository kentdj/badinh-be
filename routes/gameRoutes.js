const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllGame
} = require('../controllers/gameController');

router.route('/').get(authenticateUser, getAllGame);

module.exports = router;