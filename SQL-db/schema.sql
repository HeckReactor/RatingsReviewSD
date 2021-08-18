DROP DATABASE IF EXISTS reviewsratings;
CREATE DATABASE reviewsratings;

\c reviewsratings;

CREATE TABLE IF NOT EXISTS reviews (
	id serial PRIMARY KEY NOT NULL,
	product_id integer NOT NULL,
	rating integer NOT NULL,
	date VARCHAR(20) NOT NULL,
	summary VARCHAR(255) NOT NULL,
	body TEXT NOT NULL,
	recommend BOOLEAN NOT NULL DEFAULT 'true',
	reported BOOLEAN NOT NULL DEFAULT 'false',
	reviewer_name varchar(32) NOT NULL,
	email varchar(64) NOT NULL,
	response VARCHAR(255) NOT NULL DEFAULT '',
	helpfulness integer NOT NULL DEFAULT 0
) ;

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, email, response, helpfulness )
FROM '/Users/mango/Documents/shortenedData/reviews.csv'
DELIMITER ','
CSV
HEADER;


CREATE TABLE IF NOT EXISTS photos (
	id serial PRIMARY KEY NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(id),
	url TEXT NOT NULL
);

COPY photos(id, review_id, url)
FROM '/Users/mango/Documents/shortenedData/reviews_photos.csv'
DELIMITER ','
CSV
HEADER;

CREATE TABLE IF NOT EXISTS characteristic_reviews (
	id serial PRIMARY KEY NOT NULL,
	characteristic_id integer NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(id),
	value integer NOT NULL
);

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/Users/mango/Documents/shortenedData/characteristic_reviews.csv'
DELIMITER ','
CSV
HEADER;

CREATE TABLE IF NOT EXISTS characteristics (
	id serial PRIMARY KEY NOT NULL,
	product_id integer NOT NULL,
	name varchar(16) NOT NULL
);

COPY characteristics(id, product_id, name)
FROM '/Users/mango/Documents/shortenedData/characteristics.csv'
DELIMITER ','
CSV
HEADER;

-- update null string to empty string
UPDATE reviews SET response = '' where response =  'null';
-- necessary or else i won't get back any data
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO calvin;
-- Made indexes, should be faster
CREATE INDEX productID_index ON reviews (product_id);
CREATE INDEX reviewID_photo_index ON photos (review_id);
CREATE INDEX characteristicID_review_index ON characteristic_reviews (characteristic_id);
CREATE INDEX reviewID_characteristics_index ON characteristic_reviews(review_id);









