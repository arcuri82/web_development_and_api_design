const app = require("./app");
const repository = require("./repository");



app.listen(8081, () => {
    console.log('Starting RESTful API');
    repository.initWithSomeBooks();
});

