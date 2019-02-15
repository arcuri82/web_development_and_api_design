const app = require("./app");
const WsHandler = require('./ws/ws-handler');

const server = require('http').Server(app);
WsHandler.start(server);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Started NodeJS server on port ' + port);
});

