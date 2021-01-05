CREATE TABLE posts
(
    id integer NOT NULL PRIMARY KEY,
    link text NOT NULL,
    time_written text NOT NULL,
    owner_id integer NOT NULL,
    title text NOT NULL
);

CREATE TABLE users
(
    id integer NOT NULL,
    nickname text NOT NULL,
    about text NOT NULL,
    time_of_creation text NOT NULL,
    favorites text
);

CREATE TABLE comments
(
    id integer NOT NULL,
    post_id integer NOT NULL,
    comment text NOT NULL,
    post_title text NOT NULL,
    time_stamp text NOT NULL,
    comment_to CHARACTER,
    src_comment_id integer NOT NULL
);