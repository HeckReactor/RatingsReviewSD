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
      reviews.id as review_id,
            rating,
            summary,
            recommend,
            response,
            body,
            date,
            reviewer_name,
            helpfulness,
            array_agg(
              json_build_object(
               'id', photos.id,
               'url', url
               )) as photos
            FROM reviews
            LEFT OUTER JOIN photos ON reviews.id = photos.review_id
            WHERE product_id = $1 and reported = false
            GROUP BY reviews.id
            ORDER BY ${sortQuery}
            LIMIT $2
            OFFSET $3;`,
      values: [product, count, page],
    };
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    });
  },
};
