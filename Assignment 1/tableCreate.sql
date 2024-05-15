create database shop;
use shop;
 
create table client_master (
    client_no varchar(6) primary key,
    name varchar(20) not null,
    address1 varchar(30),
    address2 varchar(30),
    city varchar(15),
    pincode int(8),
    state varchar(15),
    bal_due decimal(10,2),
    constraint client_check check (client_no like 'C%')
);
 
create table product_master (
    product_no varchar(6) primary key,
    description varchar(15) not null,
    profit_percentage decimal(4,2) not null,
    unit_measure varchar(10) not null,
    qty_on_hand int(8) not null,
    reorder_lvl int(8) not null,
    sell_price decimal(8,2) not null check (sell_price > 0),
    cost_price decimal(8,2) not null check (cost_price > 0),
    constraint product_check check (product_no like 'P%')
);
 
create table salesman_master (
    salesman_no varchar(6) primary key check (salesman_no like 'S%'),
    salesman_name varchar(20) not null,
    address1 varchar(30) not null,
    address2 varchar(30),
    city varchar(20),
    pincode int(8),
    state varchar(20),
    sal_amt decimal(8,2) not null check (sal_amt > 0),
    tgt_to_get decimal(6,2) not null check (tgt_to_get > 0),
    ytd_sales decimal(6,2) not null,
    remarks varchar(60)
);
 
create table sales_order (
    order_no varchar(6) primary key check (order_no like 'O%'),
    client_no varchar(20) references client_master(client_no),
    order_date date not null,
    dely_addr varchar(30),
    salesman_no varchar(6) references salesman_master(salesman_no),
    dely_type char(1) default 'F',
    bill_yn char(1),
    dely_date date check (dely_date > order_date),
    order_status enum ('In Process', 'Fulfilled', 'BackOrder', 'Cancelled') not null,
);

create table sales_order_details (
    order_no varchar(6) references sales_order(order_no),
    product_no varchar(6) references product_master(product_no),
    qty_ordered int(8),
    qty_disp int(8),
    product_rate decimal(10,2)
);