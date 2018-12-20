/*
    Class used to simulate a database, and operations on it
 */


const users = new Map();

const news = new Map();

let counter = 0;


function createId(){
    const id = "id" + counter;
    counter++;
    return id;
}

function reset(){
    users.clear();
    news.clear();
    counter = 0;
}

function getNews(){
    return Array.from(news.values());
}


function getNewsById(id){
    return news[id];
}

function createNews(title, text, authorId){

    if(! users[authorId]){
        return null;
    }

    const id = createId();

    news[id] = {id, title, text, authorId, comments: []};

    return id;
}

function getUserById(id){
    return users[id];
}


function createUser(id, name, middlename, surname, email) {

    if(id === null || id === undefined || users[id]){
        return false;
    }

    users[id] = {id, name, middlename, surname, email}

    return true;
}


function addComment(text, newsId, authorId){

    if(! news[newsId] || ! users[authorId]){
        return false;
    }

    const id = createId();

    news[newsId].comments.push({id, text, newsId, authorId});

    return true;
}