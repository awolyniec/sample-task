const express = require('express');

const middlewares = require('./middlewares');
const router = require('./routes');

const PORT = 3001; // TODO: make config repo

const app = express();

app.use(middlewares);

// routes
app.use(router);

app.listen(PORT, () => {
  console.log(`sample-task listening at http://localhost:${PORT}`)
});