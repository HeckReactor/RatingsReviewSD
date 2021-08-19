/* eslint-disable no-unused-vars */
const pool = require('../../SQL-db');

module.exports = {
  // async waits for asynchronous to finish doing what it gotta do
  getReviews: async (queryParam, callback) => {
    // now we wait for the pool to connect, let's name it client
    const client = await pool.connect();
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
            product_id,
            rating,
            summary,
            recommend,
            response,
            body,
            to_timestamp((date:: bigint)/1000) as date,
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

    // deceipher these runes later
    try {
      const results = await client.query(query);
      return callback(null, results.rows);
    } catch (e) {
      return callback(e);
    } finally {
      client.release();
    }
  },
};
