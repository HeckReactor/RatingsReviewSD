/* eslint-disable import/extensions */
// const path = require('path');
const express = require('express');
const router = require('./routes.js');

const app = express();
const PORT = 3000;

// middleware
// app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on Port: ', PORT);
});
