const express = require('express');

const app = express();

const indexRouter = require('./routes');

app.use('/api', indexRouter);

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`)
});