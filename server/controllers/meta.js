/* eslint-disable no-console */
/* eslint-disable camelcase */
const models = require('../models');
const tool = require('../helperFunctions.js');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    const metaData = {
      product: product_id,
      ratings: {},
      recommend: {},
      characteristics: {},
    };

    const ratings = models.meta.getRatings(req.query)
      .then(({ rows }) => {
        tool.ratingsObj(rows, metaData);
      })
      .catch((err) => {
        console.log('Error while retrieving ratings: ', err);
      });

    const recomends = models.meta.getRecommend(req.query)
      .then(({ rows }) => {
        tool.recommendedObj(rows, metaData);
      })
      .catch((err) => {
        console.log('Error while retrieving recommend: ', err);
      });

    const characteristics = models.meta.getCharacteristics(req.query)
      .then(({ rows }) => {
        tool.characteristicsList(rows, metaData);
      })
      .catch((err) => {
        console.log('Error while retrieving characteristics: ', err);
      });

    Promise.all([ratings, recomends, characteristics])
      .then(() => {
        res.send(metaData);
      })
      .catch((err) => {
        console.log(err);
        res.send(404);
      });
  },
};
