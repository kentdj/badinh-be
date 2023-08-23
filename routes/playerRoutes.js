const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllPlayer
} = require('../controllers/playerController');

router.route('/').get(authenticateUser, getAllPlayer);

module.exports = router;