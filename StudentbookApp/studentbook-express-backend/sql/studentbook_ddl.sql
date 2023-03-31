drop schema if exists studentbook;
create schema studentbook;
use studentbook;

create table user
(
    id          int auto_increment primary key,
    name        varchar(100) not null,
    status      varchar(100) not null,
    loggedIn    boolean not null,
    constraint user_id
        unique (id)
);

INSERT INTO studentbook.user (id, name, status, loggedIn) VALUES (1, 'Sébastien', 'offline', false);
INSERT INTO studentbook.user (id, name, status, loggedIn) VALUES (2, 'Niels', 'online', true);

create table message
(
    messageId   int auto_increment primary key,
    author      varchar(100) not null, --author      varchar(100) DEFAULT 'Sebast',
    tekst       varchar(1000) not null, --tekst       varchar(1000) not null,
    dateSent    date not null, --dateSent    date DEFAULT '2022-5-10',
    type        varchar(100) not null, --type        varchar(100) DEFAULT 'public'
    constraint message_PK
        unique (messageId)
    --hier dan nog constraint foreign key userid of author?
);

INSERT INTO studentbook.message (messageId, author, tekst, dateSent, type) VALUES (1, 'Sébastien', 'Hey, dit is mijn eerste message!', '2022-4-1', 'public');
INSERT INTO studentbook.message (messageId, author, tekst, dateSent, type) VALUES (2, 'Niels', 'Ik heb een vraag over ons vak.', '2022-5-10', 'private');

--many to many relation creates new table with the 2 primary keys of the realtion other tables as foreign keys 
create table friends
(
    id          int auto_increment
        primary key,
    user_id1 int not null,
    user_id2   int not null, 
    constraint fk_user_id1
        foreign key (user_id1) references user (id),
    constraint fk_user_id2
        foreign key (user_id2) references user (id)
);

INSERT INTO studentbook.friends (id, user_id1, user_id2) VALUES (1, 1, 2);

--primary key van 1 kant als foreign key naar many kant bij 1 to many relation