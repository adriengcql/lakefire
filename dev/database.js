const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database')
});

const citySchema = new mongoose.Schema({
  name: String,
  population: Number,
});

const City = mongoose.model('City', citySchema);

City.deleteMany({}, () => { });

const paris = new City({
  name: 'Paris',
  population: 100
});

const mock = [
  new City({
    name: 'Berlin',
    population: 50
  }),
  new City({
    name: 'Londres',
    population: 110
  }),
  new City({
    name: 'Madrid',
    population: 40
  }),
]

paris.save(function (err) {
  if (err) return console.error(err);
});

setTimeout(() => {
  City.insertMany(mock)
}, 10000);

module.exports = mongoose;
