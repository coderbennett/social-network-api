const { User } = require('../models/User.js');
const { Thought } = require('../models/Thought.js');

const { ObjectId } = require('mongoose').Types;

module.exports = {
    //show all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts
                }
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //show 1 thought with specific id
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v')
            .lean()
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id'})
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought }},
                    { runValidators: true, new: true }
                )
                res.json(thought);
            })
            .catch((err) => res.status(500).json(err));
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id'})
                    : res.status(200).json({ message: 'Thought deleted successfully.'})
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },
    //create a reaction to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a reaction to a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.body.reactionId }}},
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought 
                    ? res.status(404).json({ message: 'No thought found with that id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};