/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const pool = require('../../SQL-db');

module.exports = {
  getRatings: async ({ product_id }) => {
    const client = await pool.connect();
    const query = {
      text:
      `SELECT json_build_object
      (rating, count(rating)) as ratingCount
      FROM reviews
      WHERE product_id = $1
      GROUP BY rating
      ORDER BY rating;`,
      values: [product_id],
    };
    try {
      const results = await client.query(query);
      return results;
    } catch (e) {
      return e;
    } finally {
      client.release();
    }
  },
  getRecommend: async ({ product_id }) => {
    const client = await pool.connect();
    const query = {
      text:
      `SELECT json_build_object
      (recommend, count(recommend)) as recommend
      FROM reviews
      WHERE product_id = $1
      GROUP BY recommend;`,
      values: [product_id],
    };
    try {
      const results = await client.query(query);
      return results;
    } catch (e) {
      return e;
    } finally {
      client.release();
    }
  },
  getCharacteristics: async ({ product_id }) => {
    const client = await pool.connect();
    const query = {
      text:
      `SELECT json_build_object(
        name, json_build_object(
          'id', characteristic_id,
          'value', avg(value)
          )
        ) as chars
      FROM characteristics
      INNER JOIN characteristic_reviews
      ON characteristics.id = characteristic_id
      WHERE product_id = ${product_id}
      GROUP BY name, characteristic_id;`,
    };
    try {
      const results = await client.query(query);
      return results;
    } catch (e) {
      return e;
    } finally {
      client.release();
    }
  },
};
