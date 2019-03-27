let express = require('express');
let app = express();
let path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

console.log('Server listening on port 9000');
app.listen(3000);