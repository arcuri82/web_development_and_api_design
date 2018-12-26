const app = require("./app");
const repository = require("./repository");



app.listen(8081, () => {
    repository.initWithSomeBooks();
    console.log('Started RESTful API');
});

