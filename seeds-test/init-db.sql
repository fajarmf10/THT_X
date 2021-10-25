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
                             "login" varchar(255) NOT NULL,
                             "avatar_url" varchar(255) NOT NULL,
                             "followers_url" varchar(255) NOT NULL,
                             "following_url" varchar(255) NOT NULL,
                             "organization_id" varchar(50) NOT NULL,
                             "followers" bigint NOT NULL,
                             "following" bigint NOT NULL,
                             "created_at" timestamp,
                             "updated_at" timestamp,
                             PRIMARY KEY ("id")
);
