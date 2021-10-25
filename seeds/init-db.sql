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

INSERT INTO public.organization (id,organization_name,created_at,updated_at)
VALUES ('xendit','Xendit','2021-10-24 17:47:54.942','2021-10-24 17:47:54.942');
INSERT INTO public.organization (id,organization_name,created_at,updated_at)
VALUES ('google','Google','2021-10-24 17:47:54.942','2021-10-24 17:47:54.942');
INSERT INTO public.organization (id,organization_name,created_at,updated_at)
VALUES ('apple','Apple','2021-10-24 17:47:54.942','2021-10-24 17:47:54.942');
INSERT INTO public.organization (id,organization_name,created_at,updated_at)
VALUES ('microsoft','Microsoft','2021-10-24 17:47:54.942','2021-10-24 17:47:54.942');
INSERT INTO public.organization (id,organization_name,created_at,updated_at)
VALUES ('lestari','Lestari','2021-10-24 17:47:54.942','2021-10-24 17:47:54.942');

INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('13687580','acetdecastro','https://avatars.githubusercontent.com/u/13687580?v=4','https://api.github.com/users/acetdecastro/followers','https://api.github.com/users/acetdecastro/following{/other_user}','xendit',3,8,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('11002383','bxcodec','https://avatars.githubusercontent.com/u/11002383?v=4','https://api.github.com/users/bxcodec/followers','https://api.github.com/users/bxcodec/following{/other_user}','xendit',583,54,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('40513202','mkamadeus','https://avatars.githubusercontent.com/u/40513202?v=4','https://api.github.com/users/mkamadeus/followers','https://api.github.com/users/mkamadeus/following{/other_user}','xendit',110,143,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('4651658','mychaelgo','https://avatars.githubusercontent.com/u/4651658?v=4','https://api.github.com/users/mychaelgo/followers','https://api.github.com/users/mychaelgo/following{/other_user}','xendit',80,26,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('7030099','wildan3105','https://avatars.githubusercontent.com/u/7030099?v=4','https://api.github.com/users/wildan3105/followers','https://api.github.com/users/wildan3105/following{/other_user}','xendit',23,14,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');

INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('56388','achivetta','https://avatars.githubusercontent.com/u/56388?v=4','https://api.github.com/users/achivetta/followers','https://api.github.com/users/achivetta/following{/other_user}','apple',503,30,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('4136295','aciidb0mb3r','https://avatars.githubusercontent.com/u/4136295?v=4','https://api.github.com/users/aciidb0mb3r/followers','https://api.github.com/users/aciidb0mb3r/following{/other_user}','apple',680,29,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');

INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('30276682','fajarmf10','https://avatars.githubusercontent.com/u/30276682?v=4','https://api.github.com/users/fajarmf10/followers','https://api.github.com/users/fajarmf10/following{/other_user}','lestari',21,8,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');

INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('241299','0xfe','https://avatars.githubusercontent.com/u/241299?v=4','https://api.github.com/users/0xfe/followers','https://api.github.com/users/0xfe/following{/other_user}','google',772,13,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');
INSERT INTO public."member" (id,login,avatar_url,followers_url,following_url,organization_id,followers,"following",created_at,updated_at)
VALUES ('6388530','44past4','https://avatars.githubusercontent.com/u/6388530?v=4','https://api.github.com/users/44past4/followers','https://api.github.com/users/44past4/following{/other_user}','google',154,0,'2021-10-24 17:50:30.693','2021-10-24 17:50:30.693');

INSERT INTO public."comment" (id,"comment",organization_id,is_deleted,created_at,updated_at)
VALUES ('346b8df4-06df-4682-99b8-4b0119094c53'::uuid,'Looking to hire SE Asia''s top dev talent!','xendit',false,'2021-10-24 17:59:01.675','2021-10-24 17:59:01.675');
INSERT INTO public."comment" (id,"comment",organization_id,is_deleted,created_at,updated_at)
VALUES ('346b8df4-06df-4682-99b8-4b0119094c52'::uuid,'Nice one','xendit',false,'2021-10-24 17:49:01.675','2021-10-24 17:49:01.675');
INSERT INTO public."comment" (id,"comment",organization_id,is_deleted,created_at,updated_at)
VALUES ('346b8df4-06df-4682-99b8-4b0119094c51'::uuid,'Test comment','xendit',true,'2021-10-24 17:39:01.675','2021-10-24 17:39:01.675');
INSERT INTO public."comment" (id,"comment",organization_id,is_deleted,created_at,updated_at)
VALUES ('346b8df4-06df-4682-99b8-4b0119094c50'::uuid,'Seeded comment','xendit',true,'2021-10-24 17:29:01.675','2021-10-24 17:29:01.675');
