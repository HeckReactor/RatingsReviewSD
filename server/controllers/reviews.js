/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const models = require('../models');

module.exports = {
  get: (req, res) => {
    const page = req.query.page || 0;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'helpful';
    const { product_id } = req.query;
    const productInfo = {
      product: product_id, count, page, sort, results: [],
    };

    models.reviews.getReviews(productInfo, (err, data) => {
      if (err) {
        res.status(404);
      } else {
        res.send(data);
      }
    });
  },

};
