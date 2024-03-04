require("dotenv").config();
const config = require('./config');
const express = require('express');
const emailRoutes = require('./src/routes/emailRoutes');
const {
  dataBase
} = require('./src/db/db');

const app = express();
const PORT = config.server.port;
const DATABASE_URL = config.database.url;

app.use(express.json());

dataBase(DATABASE_URL);
// Load routes
app.use('/emails', emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});