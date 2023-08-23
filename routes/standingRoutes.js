const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllStanding } = require('../controllers/standingController')

router.route('/').get(authenticateUser, getAllStanding);

module.exports = router;