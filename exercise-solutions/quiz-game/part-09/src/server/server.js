const app = require('./app');

const server = require('http').Server(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Started server on port ' + port);
});

