const request = require('supertest');
const {app} = require('../../../src/server/app');


test("Test create match no auth", async () =>{

    const response = await request(app).post('/api/matches');

    expect(response.statusCode).toBe(401);
});


test("Test create match with auth", async () =>{

    const user = request.agent(app);

    const signup = await user.post('/api/signup')
        .send({userId:'match_auth_foo', password:"bar"})
        .set('Content-Type', 'application/json');

    expect(signup.statusCode).toBe(201);

    const response = await user.post('/api/matches');

    expect(response.statusCode).toBe(201);
});