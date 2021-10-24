CREATE DATABASE organizations;

CREATE TABLE "public"."comment" (
                                    "id" varchar(50) NOT NULL,
                                    "comment" text NOT NULL,
                                    "organization_id" varchar(50) NOT NULL,
                                    "is_deleted" BOOL NOT NULL ,
                                    "created_at" timestamp,
                                    "updated_at" timestamp,
                                    PRIMARY KEY ("id")
);

CREATE TABLE "public"."organization" (
                                         "id" varchar,
                                         "organization_name" varchar(255),
                                         "created_at" timestamp,
                                         "updated_at" timestamp,
                                         PRIMARY KEY ("id")
);

CREATE TABLE "public"."member" (
                             "id" varchar,
                             "login" varchar(255),
                             "avatar_url" varchar(255),
                             "followers_url" varchar(255),
                             "following_url" varchar(255),
                             "followers" bigint,
                             "following" bigint,
                             "created_at" timestamp,
                             "updated_at" timestamp,
                             PRIMARY KEY ("id")
);
