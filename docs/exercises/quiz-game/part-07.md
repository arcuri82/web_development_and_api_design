TODO

adding 


    "test": "jest --coverage",
    "dev": "concurrently \"yarn watch:client\" \"yarn watch:server\"",
    "watch:client": "webpack --watch --mode development",
    "watch:server": "nodemon src/server/server.js --watch src/server --watch public/bundle.js",
    

Move quizzes.js to server, but the one from Les05

connection to REST to get quizzes    