const express = require('express');
const book = require('./routes/books');
const user = require('./routes/users');
const err404 = require('./middleware/error_404');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/users', user);
app.use('/api/books', book);
app.use(err404);

app.listen(PORT);