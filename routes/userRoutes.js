const express = require('express');
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const { route } = require('./authRoutes');

router.route('/').get(getAllUsers);
router.route('/currentUser').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updateUserPassword);
router.route('/:id').get(getSingleUser)

module.exports = router;