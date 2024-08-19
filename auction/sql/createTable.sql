create database auction;
use auction

create table seller(
    sID varchar(5) primary key,
    acc_no varchar(16)
);

create table buyer(
    bID varchar(5) primary key,
    addr varchar(50)
);

create table item(
    uid varchar(5) primary key,
    sID varchar(5) references seller(sID),
    title varchar(20),
    descr varchar(50),
    start_bid int,
    bid_inc int,
    auc_start date,
    auc_end date
);

create table bid(
    uid varchar(5) references item(uid),
    bID varchar(5) references buyer(bID),
    price int,
    bid_time time
);