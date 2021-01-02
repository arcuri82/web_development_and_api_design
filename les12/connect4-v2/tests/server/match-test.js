const request = require('supertest');

const WS = require('ws');
const Users = require('../../src/server/db/users');
const {app} = require('../../src/server/app');
const {checkConnectedWS} = require('../mytest-utils-ws');
const {asyncCheckCondition} = require('../mytest-utils');


/*
    Useful during debugging. By default, when there is an internal
    500 error, Express does not show you anything.
    So, here we print the stack-trace
 */
const errorHandler = function (err, req, res, next) {
    console.log(err.stack);
    res.send(500);
};
app.use(errorHandler);


/*
    As for WS we are not using SuperTest directly, we need to start
    the server manually, binding it on an ephemeral port;
 */

let server;
let port;

beforeAll(done => {

    server = app.listen(0, () => {
        port = server.address().port;
        done();
    });
});

afterAll(done => {
    server && server.close(done);
});


beforeEach(() => {
    Users.resetAllUsers();
});


const createUser = async (userId) => {

    const payload = {userId, password: '123'};

    const response = await request(app)
        .post('/api/signup')
        .send(payload);
    expect(response.statusCode).toBe(201);

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

const createUserAndToken = async (userId) => {
    const cookie = await createUser(userId);
    const wstoken = await getToken(cookie);

    return {userId, wstoken};
};


test("Can open web socket", async () => {

    const socket = new WS('ws://localhost:' + port);
    const connected = await checkConnectedWS(socket, 2000);
    expect(connected).toBe(true);
    socket.close();
});


test("Test invalid token", async () => {

    const socket = new WS('ws://localhost:' + port);
    const connected = await checkConnectedWS(socket, 2000);
    expect(connected).toBe(true);

    let errorMsg;

    socket.on("message", data => {
        const dto = JSON.parse(data);
        errorMsg = dto.error;
    });

    socket.send(JSON.stringify({topic: "login", wstoken: "an invalid token"}));

    const invalid = await asyncCheckCondition( () => {return errorMsg === "Invalid token"}, 1000, 200);
    expect(invalid).toBe(true);

    socket.close();
});


test("Test token login", async () => {

    const {cookie, wstoken} = await createUserAndToken("foo");

    const socket = new WS('ws://localhost:' + port);
    const connected = await checkConnectedWS(socket, 2000);
    expect(connected).toBe(true);


    let errorMsg;

    socket.on("message", data => {
        const dto = JSON.parse(data);
        errorMsg = dto.error;
    });

    socket.send(JSON.stringify({topic: "login", wstoken: wstoken}));

    const withError = await asyncCheckCondition( () => {return errorMsg}, 3000, 200);

    /*
        Note: in current system we do not have an explicit message stating login was successful.
        So, we just check we did not get any error message back
     */
    expect(withError).toBe(false);

    socket.close();
});

