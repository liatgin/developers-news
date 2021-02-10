CREATE TABLE posts
(
    post_id uuid NOT NULL PRIMARY KEY,
    link text NOT NULL,
    time_written DATE NOT NULL,
    owner_id uuid NOT NULL,
    owner_name text,
    title text NOT NULL
);

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df971', 'https://www.severe-weather.eu/global-weather/polar-vortex-collapse-winter-weather-europe-united-states-2021-fa/', '2020-01-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', 'Severe weather Europe');

INSERT INTO posts(post_id, link , time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df972', 'https://www.ecosia.org/', '2019-01-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', 'Here They Come');

INSERT INTO posts(post_id, link , time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df973', 'https://www.gmo.com/asia/research-library/waiting-for-the-last-dance', '2017-01-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b6', 'hacker1991', 'Its already here');

INSERT INTO posts(post_id, link , time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df974', 'https://bugzilla.mozilla.org/show_bug.cgi?id=1682995', '2020-01-09', 'a81bc81b-dead-4e5d-abff-90865d1e13b6', 'hacker1991', 'New Year New Hope');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df975', 'https://siasky.net/', '2019-02-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b2', 'cocoMan23', 'Build a free Internet');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df976', 'https://usbq.org/', '2018-03-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b2', 'cocoMan23', 'USBQ Toolkit');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df977', 'https://www.linux.org/threads/common-pronunciations-of-linux-directories-commands-etc.4445/', '2020-04-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b3', 'pug&bug', 'Linux');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df978', 'https://avinayak.github.io/art/2021/01/09/noise-planets.html', '2020-07-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b3', 'pug&bug', 'Noise Planets');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df979', 'https://www.state.gov/the-clean-network/', '2020-05-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', 'The Clean Network');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df970', 'https://queue.acm.org/detail.cfm?ref=rss&id=3446917', '2018-04-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', 'acm queue');

INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
VALUES ('0e37df36-f698-11e6-8dd4-cb9ced3df911', 'https://danielbmarkham.com/the-platform-is-the-enemy/', '2019-09-08', 'a81bc81b-dead-4e5d-abff-90865d1e13b5', 'Abigooligool', 'This Platform Is The Enemy');

CREATE TABLE users
(
    usr_id uuid NOT NULL,
    usr_name text NOT NULL,
    password CHAR(60),
    about text NOT NULL,
    time_of_creation DATE NOT NULL,
    favorites UUID[]
);

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', '123123123', 'I love reading books and think I am curious, nice, intersting, modest person', '2015-01-08', NULL);

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b6', 'hacker1991', '123123123', 'I love traveling and think I am curious, nice, intersting, modest person', '2015-01-08', '{"0e37df36-f698-11e6-8dd4-cb9ced3df911"}');

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b2', 'cocoMan23', '123123123', 'Dogs are my gratest love especially Pugs. Love codig and learning new things', '2015-01-08', '{"0e37df36-f698-11e6-8dd4-cb9ced3df911", "0e37df36-f698-11e6-8dd4-cb9ced3df975"}');

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b3', 'pug&bug', '123123123', 'Hey all.. I am wondering where did we come from', '2015-01-08', '{"0e37df36-f698-11e6-8dd4-cb9ced3df971", "0e37df36-f698-11e6-8dd4-cb9ced3df978", "0e37df36-f698-11e6-8dd4-cb9ced3df975", "0e37df36-f698-11e6-8dd4-cb9ced3df979"}');

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', '123123123', 'My dream is to live in Paris', '2015-01-08', '{"0e37df36-f698-11e6-8dd4-cb9ced3df970", "0e37df36-f698-11e6-8dd4-cb9ced3df977"}');

INSERT INTO users(usr_id, usr_name, password, about, time_of_creation, favorites) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b5', 'Abigooligool', '123123123', 'I love kickboxing and swimming. Live in Alaska its very cold here', '2015-01-08', '{"0e37df36-f698-11e6-8dd4-cb9ced3df971", "0e37df36-f698-11e6-8dd4-cb9ced3df975", "0e37df36-f698-11e6-8dd4-cb9ced3df979"}');


CREATE TABLE comments
(
    comment_id uuid NOT NULL,
    post_id uuid NOT NULL,
    owner_id uuid NOT NULL,
    owner_name text,
    comment text NOT NULL,
    post_title text NOT NULL,
    time_of_creation DATE NOT NULL,
    comment_to text,
    src_comment_id uuid
);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13a1', '0e37df36-f698-11e6-8dd4-cb9ced3df971', 'a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', 'Great post', 'Severe weather Europe', '2021-01-01', 'post', NULL);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('b81bc81b-dead-4e5d-abff-90865d1e13b2', '0e37df36-f698-11e6-8dd4-cb9ced3df972', 'a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', 'Thank you for sharing', 'Here They Come', '2021-01-01', 'post', NULL);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('c81bc81b-dead-4e5d-abff-90865d1e13b3', '0e37df36-f698-11e6-8dd4-cb9ced3df972', 'a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', 'I learnt something new, tnx', 'Here They Come', '2021-01-01', 'comment', 'b81bc81b-dead-4e5d-abff-90865d1e13b2');

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('d81bc81b-dead-4e5d-abff-90865d1e13b4', '0e37df36-f698-11e6-8dd4-cb9ced3df972', 'a81bc81b-dead-4e5d-abff-90865d1e13b3', 'pug&bug', 'I disagree with the article but interesting point of view', 'Here They Come', '2021-01-01', 'comment', 'b81bc81b-dead-4e5d-abff-90865d1e13b2');

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('e81bc81b-dead-4e5d-abff-90865d1e13b5', '0e37df36-f698-11e6-8dd4-cb9ced3df972', 'a81bc81b-dead-4e5d-abff-90865d1e13b5', 'Abigooligool', 'Awesome news!', 'Here They Come', '2021-01-01', 'comment', 'b81bc81b-dead-4e5d-abff-90865d1e13b2');

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('f81bc81b-dead-4e5d-abff-90865d1e13b6', '0e37df36-f698-11e6-8dd4-cb9ced3df911', 'a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', 'Very interesting', 'This Platform Is The Enemy', '2021-01-01', 'post', NULL);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('b81bc81b-dead-4e5d-abff-90865d1e13b7', '0e37df36-f698-11e6-8dd4-cb9ced3df911', 'a81bc81b-dead-4e5d-abff-90865d1e13b2', 'cocoMan23', 'Thanks', 'This Platform Is The Enemy', '2021-01-01', 'comment', 'f81bc81b-dead-4e5d-abff-90865d1e13b6');

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b8', '0e37df36-f698-11e6-8dd4-cb9ced3df911', 'a81bc81b-dead-4e5d-abff-90865d1e13b6', 'hacker1991', 'Wow', 'This Platform Is The Enemy', '2021-01-01', 'comment', 'b81bc81b-dead-4e5d-abff-90865d1e13b7');

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b9', '0e37df36-f698-11e6-8dd4-cb9ced3df976', 'a81bc81b-dead-4e5d-abff-90865d1e13b1', 'SQLqueen', 'SHIGAON', 'USBQ Toolkit', '2020-01-01', 'post', NULL);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e1399', '0e37df36-f698-11e6-8dd4-cb9ced3df979', 'a81bc81b-dead-4e5d-abff-90865d1e13b4', 'lll1999', 'LOL', 'The Clean Network', '2021-01-01', 'post', NULL);

INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id) 
VALUES ('a81bc81b-dead-4e5d-abff-90865d1e1312', '0e37df36-f698-11e6-8dd4-cb9ced3df970', 'a81bc81b-dead-4e5d-abff-90865d1e13b3', 'pug&bug', 'IT WAS BORING', 'acm queue', '2021-01-01', 'post', NULL);
