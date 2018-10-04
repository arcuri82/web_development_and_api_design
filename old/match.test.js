const request = require('supertest');
import openSocket from 'socket.io-client';

const WsHandler = require('../les11/connect4-v2/src/server/ws/ws_handler');
const Users = require('../les11/connect4-v2/src/server/db/users');


const app = require('../les11/connect4-v2/src/server/app');

/*
    Useful during debugging. By default, when there is an internal
    500 error, Express does not show you anything.
    So, here we print the stack-trace
 */
const errorHandler = function(err, req, res, next){
    console.log(err.stack);
    res.send(500);
};
app.use(errorHandler);

const server = require('http').Server(app);
WsHandler.start(server);
server.listen(0);

const port = server.address().port;
const baseUrl = "http://localhost:" + port;

console.log("Server started on: '" + baseUrl+"'");


const createUser = async (userId) => {

    const payload = {userId, password: '123'};

    const response = await request(app)
        .post('/api/signup')
        .send(payload);
    expect(response.statusCode).toBe(204);

    const cookie = response.headers['set-cookie'];
    return cookie;
};

const getToken = async (cookie) => {

    const response = await request(app)
        .post('/api/wstoken')
        .set('cookie', cookie);
    expect(response.statusCode).toBe(201);
    expect(response.body.wstoken).toBeDefined();

    return response.body.wstoken;
};

const createUserAndToken = async (userId) =>{
    const cookie = await createUser(userId);
    const wstoken = await getToken(cookie);

    return {userId, wstoken};
};

const openAndInitSocket = () => {

    return new Promise((resolve, reject) =>{

        const socket = openSocket(baseUrl);

        socket.on('connection', () => {
            resolve(socket);
        });

        socket.on('connect_error', (error) => {
            reject("Connection error: " + error);
        });
    });
};

const promiseWithTimeout = function(ms, promise){

    const timeout = new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in '+ ms + 'ms.')
        }, ms)
    });

    return Promise.race([promise, timeout]);
};


beforeEach(() => {Users.resetAllUsers();});


test("Can open web socket", async () => {

    // const socket = await promiseWithTimeout(3000, openAndInitSocket());
    const socket = await openAndInitSocket();

    expect(socket).toBeDefined();

    socket.close();
});


test("Test invalid token", async () =>{

    const socket = await promiseWithTimeout(3000, openAndInitSocket());

    socket.emit("login", {wstoken: "an invalid token"});

    const handleUpdate = new Promise((resolve, reject) => {
        socket.on("update", data => {
            resolve(data.error);
        });
    });

    const error = await promiseWithTimeout(1000, handleUpdate);

    expect(error).toBe("Invalid token");
});



//FIXME
test("Test token login", async () => {

    const {cookie, wstoken} = await createUserAndToken("foo");


    const socket = openSocket(baseUrl);

    expect(response.statusCode).toBe(401);
});

console.log("Going to close server");
server.close();