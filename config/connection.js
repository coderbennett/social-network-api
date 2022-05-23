const { connect, connection } = require('mongoose');

const connectionString =
process.env.MONGODB_URI || 'mongodb:localhost:27017/socialmediaDB';

connect(connectionString, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;