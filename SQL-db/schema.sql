DROP DATABASE IF EXISTS ReviewsRatings;
CREATE DATABASE ReviewsRatings;

\c ReviewsRatings;

CREATE TABLE reviews (
	review_id serial PRIMARY KEY NOT NULL,
	product_id integer NOT NULL,
	rating integer(1) NOT NULL,
	date VARCHAR(20) NOT NULL,
	summary VARCHAR(255) NOT NULL,
	body VARCHAR(255) NOT NULL,
	recommend BOOLEAN NOT NULL DEFAULT 'true',
	reported BOOLEAN NOT NULL DEFAULT 'false',
	reviewer_name varchar(32) NOT NULL,
	email varchar(32) NOT NULL,
	response VARCHAR(255) NOT NULL DEFAULT '',
	helpfulness integer NOT NULL DEFAULT 0
) ;

COPY reviews (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, email, response, helpfulness )
FROM '/Users/mango/Documents/shortenedData/reviews.csv'
DELIMITER ','
CSV HEADER;


CREATE TABLE photos (
	photo_id serial PRIMARY KEY NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(review_id),
	photo_url TEXT NOT NULL
);

COPY photos (photo_id, review_id, photo_url)
FROM '/Users/mango/Documents/shortenedData/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristic_reviews (
	id serial PRIMARY KEY NOT NULL,
	review_id integer NOT NULL REFERENCES reviews(review_id),
	characteristic_id integer NOT NULL,
	value integer NOT NULL
);

COPY characteristics_reviews (id, review_id, characteristic_id)
FROM '/Users/mango/Documents/shortenedData/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE characteristics (
	characteristic_id serial PRIMARY KEY NOT NULL,
	product_id integer NOT NULL,
	name varchar(16) NOT NULL
);

COPY characteristics (characteristic_id, product_id, name)
FROM '/Users/mango/Documents/shortenedData/characteristics.csv'
DELIMITER ','
CSV HEADER;









