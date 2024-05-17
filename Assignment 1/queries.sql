select product_no, description, sell_price from product_master where sell_price > 500 && sell_price < 750;

select order_no, order_date from sales_order where month(order_date) = 5 || month(order_date) = 6;

select
    p.product_no,
    p.description,
    qty_ordered
from
    product_master p
    join sales_order_details sod on p.product_no = sod.product_no
    join sales_order so on sod.order_no = so.order_no
    join client_master cm on so.client_no = cm.client_no
where
    cm.name in ('Ravi', 'Basu');