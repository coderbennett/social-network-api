const router = require('express').Router();
const {
    getThoughts, 
    createThought, 
    getThought, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction
} = require('../../controllers/thoughtController.js');

// api -> thought
router.route('/').get(getThoughts).post(createThought);

// api -> thought -> id
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// api -> thought -> id -> reactions

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;