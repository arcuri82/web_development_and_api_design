
/*
    For each active player that is currently online, we need to keep
    track of their WS sockets.
 */

const socketToUser = new Map();

const userToSocket = new Map();


function registerSocket(socket, userId){

    socketToUser.set(socket.id, userId);
    userToSocket.set(userId, socket);
}

function removeSocket(socketId){

    const userId = socketToUser.get(socketId);
    socketToUser.delete(socketId);
    userToSocket.delete(userId);
}


function removeUser(userId){

    const socketId = userToSocket.get(userId).id;
    userToSocket.delete(userId);
    socketToUser.delete(socketId);
}


function isActive(userId){
    return userToSocket.has(userId);
}

function getSocket(userId){
    return userToSocket.get(userId);
}

function getUser(socketId){
    return socketToUser.get(socketId);
}

module.exports = {registerSocket, removeSocket, removeUser, isActive, getSocket, getUser};