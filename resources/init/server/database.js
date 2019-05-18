const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database')
});

module.exports = mongoose;
