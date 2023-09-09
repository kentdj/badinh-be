const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const { getAllStanding,
  getSingleStanding,
  createStanding,
  updateStanding } = require('../controllers/standingController')

router.route('/')
  .get(authenticateUser, getAllStanding)
  .post([authenticateUser, authorizePermissions('admin')], createStanding);


router.route('/:id')
  .get(authenticateUser, getSingleStanding)
  .patch([authenticateUser, authorizePermissions('admin')], updateStanding);

module.exports = router;