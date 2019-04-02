const express = require('express');

const path = require('path');
const database = require('./database');

const app = express();
const server = require('http').createServer(app);
const Websocket = require('ws')
const wss = new Websocket.Server({ server })

app.use(express.static(path.join(__dirname, '/public')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

const watcher = database.models.City.watch()

wss.on('connection', function (socket) {
    console.log('new user connected');
    socket.json = function (data) { socket.send(JSON.stringify(data)) };
    socket.on('message', function (msg) {
        console.log('request', msg)
        let { keys, filters } = JSON.parse(msg)
        filters = filters ? filters : {};
        database.models.City.find(filters, function (err, data) {
            socket.json(data)
        })
        watcher.on('change', (event) => {
            if (event.operationType === 'insert') {
                filters._id = event.fullDocument._id;
                database.models.City.find(filters, function (err, data) {
                    socket.json(data)
                })
            }
        });
    });
});

server.listen(9000, function () {
    console.log('server listening on port 9000');
});

module.export = app;