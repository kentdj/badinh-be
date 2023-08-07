const express = require('express');
const router = express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');

router.route('/').get(authenticateUser, getAllUsers);
router.route('/currentUser').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router;