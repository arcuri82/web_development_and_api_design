const { gql } = require('apollo-server-express');


const typeDefs = gql`
    # A GraphQL API to handle News
    type Query{
        
        #Get all the news
        getNews: [News!]
        
        #Get a single news, specified by id
        getNewsById(id: String!) : News
        
        #Get a single user, specified by id
        getUserById(id: String!) : User
    }

    type Mutation{
        createNews(title: String!, text: String!, authorId: String!): String
        createUser(id: String!, name: String!, middlename: String, surname: String!, email: String!) : Boolean!
        addComment(text: String!, newsId: String!, authorId: String!): Boolean!
    }


    type News{
        id: String
        title: String
        text: String
        author: User
        comments: [Comment!]
        commentsCount: Int
    }

    type Comment{
        id: String
        text: String
        author: User
    }

    type User{
        id: String,
        name: String
        middlename: String
        surname: String,
        email: String
    }
`;

module.exports = typeDefs;