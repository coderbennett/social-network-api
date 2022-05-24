const router = require('express').Router();
const {getUsers, getUser, createUser} = require('../../controllers/userController');

// api -> users
router.route('/').get(getUsers).post(createUser);

// api -> users -> id
router.route('/:userId').get(getUser);

module.exports = router;