const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllStats
} = require('../controllers/statsController');

router.route('/').get(authenticateUser, getAllStats);

module.exports = router;