const router = require('express').Router();
const {getUsers, getUser, createUser, deleteUser } = require('../../controllers/userController');

// api -> users
router.route('/').get(getUsers).post(createUser);

// api -> users -> id
router.route('/:userId').get(getUser).delete(deleteUser);

// api -> users -> id -> friends -> id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;