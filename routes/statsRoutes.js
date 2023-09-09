const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllStats,
  getSingleStats,
  createStats,
  updateStats
} = require('../controllers/statsController');

router.route('/').get(authenticateUser, getAllStats).post([authenticateUser, authorizePermissions('admin')], createStats);
router.route('/:id').get(authenticateUser, getSingleStats).patch([authenticateUser, authorizePermissions('admin')], updateStats);

module.exports = router;