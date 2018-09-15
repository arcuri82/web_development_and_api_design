
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

const users = new Map();


export function getUser(id){

    return users.get(id);
}

export function verifyUser(id, password){

    const user = getUser(id);

    if(user === null){
        return false;
    }

    return user.password === password;
}

export function createUser(id, password){

    if(getUser(id) !== null){
        throw "User with id '" + id + "' already exists"
    }

    const user = {
        id: id,
        balance: 1000,
        password: password
    };

    users.set(id, user);
}


export function transferMoney(senderId, receiverId, amount){

    const sender = users.get(senderId);
    const receiver = users.get(receiverId);

    if(sender === null || receiver === null){
        return false;
    }

    if(sender.balance < amount){
        return false;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    return false;
}