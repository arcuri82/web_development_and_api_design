const DB = require('./db');

module.exports = {

    Query: {
        getNews: (parent, args, context, info) => {
            return DB.getNews();
        },
        getNewsById: (parent, args, context, info) => {
            return DB.getNewsById(args.id);
        },
        getUserById: (parent, args, context, info) => {
            return DB.getUserById(args.id);
        }
    },

    Mutation: {
        createNews: (parent, args, context, info) => {
            return DB.createNews(args.title, args.text, args.authorId);
        },
        createUser: (parent, args, context, info) => {
            return DB.createUser(args.id, args.name, args.middlename, args.surname, args.email);
        },
        addComment: (parent, args, context, info) => {
            return DB.addComment(args.text, args.newsId, args.authorId);
        }
    },

    /*
        When fields in the schema do not match 1-to-1 the fields in our domain models,
        we need to specify how to "resolve" them.
        In our case, types like News, Author and Comment in the schema are objects, ie
        nodes in the GraphQL graph.
        But, in our domain model, those are just ids.
        So, we need to map from id to object.
     */

    News: {
        author: (parent, args, context, info) => {
            return DB.getUserById(parent.authorId);
        },
        commentsCount: (parent, args, context, info) => {
            return parent.comments ? parent.comments.length : 0;
        }
    },

    Comment: {
        author: (parent, args, context, info) => {
            return DB.getUserById(parent.authorId);
        },
        news: (parent, args, context, info) => {
            return DB.getNewsById(parent.newsId);
        }
    }
};