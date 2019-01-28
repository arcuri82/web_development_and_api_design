const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(express.static('public'));


app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Started server on port ' + port);
});

