const DB = require('./db');


module.exports = {

    init: _ => {

        const smith = "Smith";
        const rossi = "Rossi";
        const batman = "Batman";
        const joker = "TheJoker";

        DB.createUser(smith, "John", null, "Smith", "john.smith@foo.com");
        DB.createUser(rossi, "Mario", null, "Rossi", "mario.rossi@bar.com");
        DB.createUser(batman, "Bruce", null, "Wayne", "bruce.wayne@batcave.bat");
        DB.createUser(joker, "Joker", null, "-", "thejoker@joke.com");

        const party = DB.createNews("Party Time!", "All invited at my party at X on new year! It is going to be EXPLOSIVE!", joker);
        DB.addComment("I will be there! Justice never sleeps!", party, batman);
        DB.addComment("I think I will pass...", party, rossi);
        DB.addComment("Sounds great!", party, smith);

        const safe = DB.createNews("The City is Safe", "Because I watch over it. Justice will triumph!", batman);
        DB.addComment("Thanks Batman!", safe, smith);
        DB.addComment("Batman!", safe, smith);
        DB.addComment("challenge accepted", safe, joker);

        const exam = DB.createNews("How can I pass the exam?", "What should I do? I need help!", smith);
        DB.addComment("Study and do the exercises every week", exam, joker);
    }
};