const crypto = require("crypto");

/*
    Map from random tokens to userId
 */
const tokens = new Map();


const randomId = () => {
    return crypto.randomBytes(10).toString('hex');
};


const createToken = (userId) =>{

    const t = randomId();

    tokens.set(t, userId);

    return t;
};


const consumeToken = (t) => {

    const userId = tokens.get(t);

    tokens.delete(t);

    return userId;
};


module.exports = {createToken, consumeToken};