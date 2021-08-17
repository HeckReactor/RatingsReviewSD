/* eslint-disable no-unused-vars */
const db = require('../../SQL-db');

module.exports = {
  getReviews: (queryParam, callback) => {
    const {
      page, count, sort, product,
    } = queryParam;
    let sortQuery;
    if (sort === 'helpful') {
      sortQuery = 'helpfulness DESC';
    } else if (sort === 'newest') {
      sortQuery = 'date ASC';
    }
    const query = {
      text: `SELECT
      review_id,
      rating,
      summary,
      body,
      recommened,
      reviewer_name,
      response,
      helpfulness
      FROM
      reviews;
      `,
    };
  },
};
