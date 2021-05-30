const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({origin: true, credentials: true}));

const indexRouter = require('./routes');
app.use('/api', indexRouter);

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`)
});