# Restaurant, Q1 2023
A restaurant maintains catalog for the list of food and beverage items that it provides. To provide food facility at the premises of the customers, the restaurant takes order online through the system. Orders on phone are also entertained. To deliver the deliveries we have delivery boys. Each delivery boy is assigned a specific area code. The delivery boy cannot deliver outside the area to which he is assigned. 

## Report 
Delivered order details within a specifie area. The report should contain the attributes Date, Customer name, Food(s). Order value, Delivery Boy. The report should be sorted in terms of date.

## ER diagram
```mermaid
erDiagram
    CATALOG {
        string food PK
        int price
        string type "food or breverage"
    }
    ORDER {
        string order_id PK
        string order_pos
        date order_date
        int order_value
        string cust_name
        string code
        string delivery_boy_name
    }
    "ORDER FOODS" {
        string order_id
        string food
        int price
    }
    "AREA CODE" {
        string code PK
    }
    "DELIVERY BOY" {
        string name PK
        string code FK
    }
    "AREA CODE" ||--|{ "DELIVERY BOY" : "delivered by"
    ORDER }|--|| "DELIVERY BOY" : "delivered by"
    "ORDER FOODS" ||--|| ORDER : in
    CATALOG ||--|{ "ORDER FOODS" : has
```
<i>ORDER FOODS has total participation in "has" relation to CATALOG but CATALOG has partial paricipation to the same relation.</i>