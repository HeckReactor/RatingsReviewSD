/* eslint-disable camelcase */
const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    models.meta.getMeta({ product: product_id }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404);
      } else {
        res.send(data);
      }
    });
  },

};
