CREATE TABLE "public.Main" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"meta_data" integer NOT NULL,
	"rating" integer NOT NULL,
	CONSTRAINT "Main_pk" PRIMARY KEY ("product_id","meta_data")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Reviews" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"review_id" integer NOT NULL,
	CONSTRAINT "Reviews_pk" PRIMARY KEY ("review_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Review Data" (
	"id" serial NOT NULL,
	"review_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"summary" VARCHAR(255) NOT NULL,
	"recommend" BOOLEAN NOT NULL,
	"response" VARCHAR(255) NOT NULL DEFAULT '""',
	"body" VARCHAR(255) NOT NULL,
	"date" DATE NOT NULL,
	"reviewer_name" VARCHAR(255) NOT NULL,
	"helpfulness" integer NOT NULL,
	"photos" integer NOT NULL,
	CONSTRAINT "Review Data_pk" PRIMARY KEY ("photos")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Photos" (
	"id" serial NOT NULL,
	"photos" integer NOT NULL,
	"photo_id" integer NOT NULL,
	"photo_url" VARCHAR(255) NOT NULL,
	CONSTRAINT "Photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Untitled" (
	"id" serial NOT NULL,
	"meta_data" integer NOT NULL,
	"characteristic_id" integer NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "Untitled_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_fk0" FOREIGN KEY ("product_id") REFERENCES "Main"("product_id");

ALTER TABLE "Review Data" ADD CONSTRAINT "Review Data_fk0" FOREIGN KEY ("review_id") REFERENCES "Reviews"("review_id");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_fk0" FOREIGN KEY ("photos") REFERENCES "Review Data"("photos");

ALTER TABLE "Untitled" ADD CONSTRAINT "Untitled_fk0" FOREIGN KEY ("meta_data") REFERENCES "Main"("meta_data");





