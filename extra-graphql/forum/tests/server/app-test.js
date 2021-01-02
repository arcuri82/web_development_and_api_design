const request = require('supertest');
const app = require('../../src/server/app');

const DB = require('../../src/server/db');
const {initDB} = require('../../src/server/db-initializer');


beforeEach(() => {
    DB.reset();
});


test("Test wrong syntax in query", async () => {

    const response = await request(app)
        .get('/graphql?query=whatever');

    /*
        HTTP is just the protocol with which we send the GraphQL request.
        GraphQL has no control over HTTP, and so errors in it will not
        affect HTTP... so an error should still result in 200 OK

        However, the framework you use to setup a GraphQL server might
        analyze the GraphQL responses, and modify HTTP accordingly.
        This is the case for Apollo+Express
     */
    expect(response.statusCode).toBe(400);

    //the response payload will info on the error
    expect(response.body.errors.length).toEqual(1);
});


test("Create and get user", async () => {

    const id = "foo";
    const name = "somename";

    let response = await request(app)
        .post('/graphql')
        .send({query: "mutation{createUser(id:\""+id+"\", name:\""+name+"\", surname:\"Bar\", email:\"foo@foo.com\")}"});

    expect(response.statusCode).toBe(200);
    expect(response.body.data.createUser).toBe(true);


    response = await request(app)
        .get('/graphql')
        .query({query:"{getUserById(id:\""+id+"\"){id,name}}"});

    expect(response.statusCode).toBe(200);
    expect(response.body.data.getUserById.id).toBe(id);
    expect(response.body.data.getUserById.name).toBe(name);
});




test("Test fail Mutation on a HTTP GET", async () => {

    const id = "foo";
    const name = "somename";

    let response = await request(app)
        .get('/graphql')
        .query({query: "mutation{createUser(id:\""+id+"\", name:\""+name+"\", surname:\"Bar\", email:\"foo@foo.com\")}"});

    /*
        In this case, a Mutation cannot be done with a GET, as GET is idempotent.
        It must go through a POST.
        In this case, the server must return a 405 (Method Not Allowed), plus
        a list of allowed methods in the "allow" header
     */
    expect(response.statusCode).toBe(405);
    expect(response.header["allow"]).toBe("POST");
});