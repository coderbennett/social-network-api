const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb:localhost:27017/socialmediaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;