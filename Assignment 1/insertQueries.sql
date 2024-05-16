insert into client_master (client_no, name, address1, city, pincode, state, bal_due) values ('C00001', 'Ivan Bayross', 'F-111', 'Bombay', 400054, 'Maharashtra', 15000);
insert into client_master (client_no, name, address1, city, pincode, state, bal_due) values ('C00002', 'Vandana', 'F-112', 'Madras', 780001, 'Tamil Nadu', 0);
insert into client_master (client_no, name, address1, city, pincode, state, bal_due) values ('C00003', 'Praveen', 'F-113', 'Bombay', 400057, 'Maharashtra', 5000);
insert into client_master (client_no, name, address1, city, pincode, state) values ('C00004', 'Basu', 'F-114', 'Bangalore', 560001, 'Karnataka');
insert into client_master (client_no, name, address1, city, pincode, state, bal_due) values ('C00005', 'Ravi', 'F-115', 'Delhi', 110005, 'Delhi', 2000);
insert into client_master (client_no, name, address1, city, pincode, state) values ('C00006', 'Rukhmani', 'F-116', 'Bombay', 400060, 'Maharashtra');

insert into product_master values ('P00001', '1.44 Floppies', 5, 'Price', 100, 20, 525, 500);
insert into product_master values ('P00002', 'Monitors', 6, 'Price', 10, 3, 12000, 11280);
insert into product_master values ('P00003', 'Mouse', 5, 'Price', 20, 5, 1050, 1000);
insert into product_master values ('P00004', '1.22 Floppies', 5, 'Price', 100, 20, 525, 500);
insert into product_master values ('P00005', 'Keyboard', 2, 'Price', 10, 3, 3150, 3050);
insert into product_master values ('P00006', '540 HDD', 2.5, 'Price', 10, 3, 5250, 5100);

insert into salesman_master values ('S00001', 'Aman', 'A/14', 'Worli', 'Mumbai', 400002, 'Maharashtra', 3000, 100, 50, 'Good');
insert into salesman_master values ('S00002', 'Omkar', '65', 'Nariman', 'Mumbai', 400001, 'Maharashtra', 3000, 200, 100, 'Good');
insert into salesman_master values ('S00003', 'Raj', 'P-7', 'Bandra', 'Mumbai', 400032, 'Maharashtra', 3000, 200, 100, 'Good');
insert into salesman_master values ('S00004', 'Ashish', 'A/5', 'Juhu', 'Mumbai', 400044, 'Maharashtra', 3500, 200, 150, 'Good');

insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19001', 'C00001', '2002-06-12', 'S00001', 'F', 'N', '2002-07-20', 'In Process');
insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19002', 'C00002', '2002-06-02', 'S00002', 'P', 'N', '2002-06-27', 'Cancelled');
insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19003', 'C00003', '2002-02-18', 'S00003', 'F', 'Y', '2002-02-20', 'Fulfilled');
insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19004', 'C00004', '2002-04-03', 'S00001', 'F', 'Y', '2002-04-07', 'Fulfilled');
insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19005', 'C00005', '2002-05-20', 'S00002', 'P', 'N', '2002-05-22', 'Cancelled');
insert into sales_order (order_no, client_no, order_date, salesman_no, dely_type, bill_yn, dely_date, order_status) values ('O19006', 'C00006', '2002-05-24', 'S00004', 'F', 'N', '2002-07-26', 'In Process');

insert into sales_order_details values ('O19001', 'P00006', 2, 1, 5250);
insert into sales_order_details values ('O19001', 'P00001', 4, 4, 525);
insert into sales_order_details values ('O19002', 'P00001', 10, 0, 525);
insert into sales_order_details values ('O19003', 'P00005', 3, 3, 3150);
insert into sales_order_details values ('O19003', 'P00006', 3, 1, 5250);
insert into sales_order_details values ('O19003', 'P00001', 10, 10, 525);
insert into sales_order_details values ('O19003', 'P00002', 4, 4, 1050);
insert into sales_order_details values ('O19004', 'P00002', 2, 2, 1050);
insert into sales_order_details values ('O19004', 'P00003', 1, 1, 12000);
insert into sales_order_details values ('O19006', 'P00001', 10, 5, 525);