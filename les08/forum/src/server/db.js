/*
    Class used to simulate a database, and operations on it
 */

const users = new Map();

const news = new Map();

let counter = 0;

const createId = () => {
    const id = "id" + counter;
    counter++;
    return id;
};


module.exports = {

    reset: () => {
        users.clear();
        news.clear();
        counter = 0;
    },

    getNews: () => {
        return Array.from(news.values());
    },


    getNewsById: (id) => {
        return news.get(id);
    },

    createNews: (title, text, authorId) => {

        if (!users.get(authorId)) {
            return null;
        }

        const id = createId();

        news.set(id, {id, title, text, authorId, comments: []});

        return id;
    },

    getUserById: (id) => {
        return users.get(id);
    },


    createUser: (id, name, middlename, surname, email) => {

        if (id === null || id === undefined || users[id]) {
            return false;
        }

        users.set(id, {id, name, middlename, surname, email});

        return true;
    },


    addComment: (text, newsId, authorId) => {

        if (!news.get(newsId) || !users.get(authorId)) {
            return false;
        }

        const id = createId();

        news.get(newsId).comments.push({id, text, newsId, authorId});

        return true;
    }
};