const express = require('express');

const path = require('path');
const database = require('./database');

const app = express();
const server = require('http').createServer(app);
const Websocket = require('ws')
const wss = new Websocket.Server({ server })


app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

const watchers = {}
for (const model in database.models) {
    watchers[model] = database.models[model].watch()
}

wss.on('connection', function (socket) {
    console.log('new user connected');
    socket.json = function (data) { socket.send(JSON.stringify(data)) };
    socket.error = function (err) { socket.send(JSON.stringify({ err })) }
    socket.on('message', function (msg) {
        console.log('request', msg)
        let { requestId, model, keys, filters, options } = JSON.parse(msg)
        filters = filters || {}
        const where = filters['where'] || {}
        const collection = database.models[model]
        if (!collection) {
            socket.error('Wrong model')
            return
        }
        if (options.one) {
            let res;
            collection.findOne(where, keys.join(' '), function (err, item) {
                res = item;
                socket.json({ requestId, item })
            })

            if (!options.noUpdate) {
                watchers[model].on('change', (event) => {
                    if (socket.readyState === 1 && event.operationType === 'insert') {
                        collection.findOne(where, keys.join(' '), function (err, item) {
                            if (item && item !== res) {
                                socket.json({ requestId, item })
                            }
                        })
                    }
                });
            }

        } else {

            collection.find(where, keys.join(' '), function (err, items) {
                socket.json({ requestId, items })
            })

            if (!options.noUpdate) {
                watchers[model].on('change', (event) => {
                    if (socket.readyState === 1 && event.operationType === 'insert') {
                        where._id = event.fullDocument._id;
                        collection.find(where, keys.join(' '), function (err, items) {
                            if (items && !(Array.isArray(items) && !items.length)) {
                                socket.json({ requestId, items })
                            }
                        })
                    }
                });
            }
        }
    });
});

server.listen(9000, function () {
    console.log('server listening on port 9000');
});

module.export = app;