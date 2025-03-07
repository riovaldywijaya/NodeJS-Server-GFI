require('dotenv').config();
const express = require('express');
const router = require('./router/user');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

console.clear();
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
