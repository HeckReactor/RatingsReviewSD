/* eslint-disable no-param-reassign */
module.exports = {
  ratingsObj: (rows, obj) => {
    rows.forEach((item) => Object.assign(obj.ratings, item.ratingcount));
  },
  recommendedObj: (rows, obj) => {
    obj.recommend.false = rows[0].recommend.false || 0;
    obj.recommend.true = rows[1].recommend.true || 0;
  },
  characteristicsList: (rows, obj) => {
    rows.forEach((item) => Object.assign(obj.characteristics, item.chars));
  },
};
