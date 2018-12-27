const app = require("./app");
const repository = require("./repository");

const port = process.env.PORT || 8081;


app.listen(port, () => {
    repository.initWithSomeBooks();
    console.log('Started RESTful API on port ' + port);
});

