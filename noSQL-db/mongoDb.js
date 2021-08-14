/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/mongodb/node-mongodb-native
 * Run this command in the terminal to launch mongo server:
 *  mongod --dbpath=/data --port 27017
 * Run this file with:
 *  node mongo-example.js
 */
// example embedded collection //
const reviewsCollection = {
  _id: '<ObjectId1>',
  product_id: 25167,
  ratings: {
    3: 1,
    4: 1,
  },
  characteristics: {
    Fit: {
      id: 84509,
      value: 1.5000000000000000,
    },
    Length: {
      id: 84510,
      value: 3.0000000000000000,
    },
    Comfort: {
      id: 84511,
      value: 2.0000000000000000,
    },
    Quality: {
      id: 84512,
      value: 2.0000000000000000,
    },
  },
  results: [
    {
      review_id: 348642,
      rating: 3,
      summary: 'this smells really bad',
      recommended: false,
      response: 'I also think it smells',
      body: 'this feels awful',
      data: '2019-04-14T00:00:00.000Z',
      reviewer_name: 'jim',
      helpfulness: 5,
      photos: [{
        photos_id: 12345,
        photos_url: 'abc.com',
      }],
    },
  ],
};

// eslint-disable-next-line import/no-unresolved
const mongoClient = require('mongodb').MongoClient;
// 27017 is the default port for connecting to MongoDB
const url = 'mongodb://localhost:27017/main';

mongoClient.connect(url, (err, db) => {
  console.log('Connected to MongoDB!');

  db.createCollection('productData');

  db.productData.insert(reviewsCollection);
  db.close();
});
