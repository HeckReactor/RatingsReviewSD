DROP DATABASE IF EXISTS reviewsratings;
CREATE DATABASE reviewsratings;

\c reviewsratings;

CREATE TABLE IF NOT EXISTS reviews (
	review_id serial PRIMARY KEY NOT NULL,
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

COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, email, response, helpfulness )
FROM '/Users/mango/Documents/shortenedData/reviews.csv'
DELIMITER ','
CSV
HEADER;


CREATE TABLE IF NOT EXISTS photos (
	photo_id serial PRIMARY KEY NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(review_id),
	photo_url TEXT NOT NULL
);

COPY photos(photo_id, review_id, photo_url)
FROM '/Users/mango/Documents/shortenedData/reviews_photos.csv'
DELIMITER ','
CSV
HEADER;

CREATE TABLE IF NOT EXISTS characteristic_reviews (
	id serial PRIMARY KEY NOT NULL,
	characteristic_id integer NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(review_id),
	value integer NOT NULL
);

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/Users/mango/Documents/shortenedData/characteristic_reviews.csv'
DELIMITER ','
CSV
HEADER;

CREATE TABLE IF NOT EXISTS characteristics (
	characteristic_id serial PRIMARY KEY NOT NULL,
	product_id integer NOT NULL,
	name varchar(16) NOT NULL
);

COPY characteristics(characteristic_id, product_id, name)
FROM '/Users/mango/Documents/shortenedData/characteristics.csv'
DELIMITER ','
CSV
HEADER;









