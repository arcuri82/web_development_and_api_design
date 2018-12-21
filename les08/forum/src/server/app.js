const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers');
const typeDefs =  require('./schema');


const app = new ApolloServer({
    typeDefs,
    resolvers
});

module.exports = app;