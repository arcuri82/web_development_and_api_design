const crypto = require("crypto");

/*
    Map from random tokens to userId
 */
const tokens = new Map();


const randomId = () => {
    /*
        A byte is composed of 8 bits.
        10 bytes are 80 bits.
        There are 2^80 possible numbers, which is a huge amount.
        We want to send such bits as a string.
        We do it in "hex" format.
        A hex is representing 16 values, 0-9 and A-F, using 4 bits (2^4=16).
        So, we need 2 hex characters per byte.
        This means that 10 random bytes can be encoded with a a string of
        length 20 containing only 0-9 and A-F symbols.
     */

    return crypto.randomBytes(10).toString('hex');
};


/*
    For a given user, associate a new random token.
 */
const createToken = (userId) =>{

    const t = randomId();

    tokens.set(t, userId);

    return t;
};


/*
    A token can be used only once.
    If a user needs to re-authenticate a WebSocket,
    a new token needs to be generated.
 */
const consumeToken = (t) => {

    const userId = tokens.get(t);

    tokens.delete(t);

    return userId;
};


module.exports = {createToken, consumeToken};