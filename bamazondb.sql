drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
	item_id integer(11) auto_increment primary key,
    product_name varchar(255) not null,
    department_name varchar(255) not null,
    price decimal(10,2) not null,
    stock_quantity integer (11) not null
);

insert into products (product_name, department_name, price, stock_quantity) 
values ("beats headphones", "electronics", 159.99, 75), ("xbox one", "electonics", 299.99, 35),
("cloud couch", "furniture", 2000.00, 10), ("cofee table", "furniture", 400.00, 20),
("laundry detergent", "household", 10.57, 600), ("windex", "household", 7.45, 550),
("bench_press", "gym", 800.00, 45), ("dumbbells", "gym", 120.00, 100),
("apples", "grocery", 1.57, 2000), ("bannana", "grocery", 3.99, 1800);


select * from products;