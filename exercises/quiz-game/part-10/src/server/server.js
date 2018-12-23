const app = require("./app");
const WsHandler = require('./ws/ws_handler');

const server = require('http').Server(app);
WsHandler.start(server);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log('Server started on port ' + port);
});

