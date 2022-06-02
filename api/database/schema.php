<?php

$tableSchema = [
  "user" => "CREATE table if not exists user (
    id int unsigned not null auto_increment,
    primary key (id),
    name varchar(50) default null,
    email varchar(50) default null unique,
    password varchar(250)  not null,
    status tinyint default 0,
    token varchar(250) null,
    date DATETIME NULL DEFAULT CURRENT_TIMESTAMP
  )",
  "movie" => "CREATE table if not exists movie (
    id int unsigned not null auto_increment,
    primary key (id),
    title varchar(50) default null,
    cast varchar(100) default null,
    language varchar(100) default null,
    genre varchar(10) default null,
    user_id int(11) not null default 0,
    date DATETIME NULL DEFAULT CURRENT_TIMESTAMP
  )",
  "booking" => "CREATE table if not exists booking (
    id int unsigned not null auto_increment,
    primary key (id),
    location varchar(20) default null,
    theatre_name varchar(100) default null,
    show_time varchar(20) default null,
    user_id int(11) default 0,
    movie_id varchar(20) default 0,
    date DATETIME NULL DEFAULT CURRENT_TIMESTAMP
  )",
];
