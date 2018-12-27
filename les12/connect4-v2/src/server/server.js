const app = require("./app");
const WsHandler = require('./ws/ws-handler');

const server = require('http').Server(app);
WsHandler.start(server);


server.listen(process.env.PORT || 8080, () => {
    console.log('Starting NodeJS server');
});

