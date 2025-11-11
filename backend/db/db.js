const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/moviesAp")
        .then(() => console.log('database connected'))
        .catch(err => console.log('database not connected', err));
};

module.exports = connectDB;