const User = require('../models/User.js');

const { ObjectId } = require('mongoose').Types;

module.exports = {
    //show all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //show 1 user with specific id
    getUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .lean()
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id!'})
                    : res.json({
                        user
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //delete a user with specific id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id!'})
                    : res.status(200).json({message: 'User deleted successfully.'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //update a user with a specific id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that id!'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //add a friend with a specific id
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that id!'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //remove a friend with a specific id
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { _id: req.params.friendId }}},
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user found with that id!'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};