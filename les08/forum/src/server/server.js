const app = require("./app");
const {init} = require('./db-initializer');

init();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

