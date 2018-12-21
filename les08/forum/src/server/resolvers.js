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
        }
    }
};