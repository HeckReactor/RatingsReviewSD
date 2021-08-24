/* eslint-disable import/extensions */
require('newrelic');
const express = require('express');
const router = require('./routes.js');

const app = express();
const PORT = 3000;

// middleware
// app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get(`/loaderio-db2bdbaa121b2f43058bc4e77f62d2b8.txt`, (req, res) => {
//   res.status(200).send('loaderio-db2bdbaa121b2f43058bc4e77f62d2b8');
// });
app.use('/', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on Port: ', PORT);
});
