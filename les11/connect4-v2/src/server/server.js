const app = require("./app");
const WsHandler = require('./ws/ws_handler');

const server = require('http').Server(app);
WsHandler.start(server);


server.listen(8080, () => {
    console.log('Starting NodeJS server');
});

