DROP TABLE IF EXISTS product_order_detail;

CREATE TABLE product_order_detail(
	order_id VARCHAR(255) NOT NULL,
	product_id INT NOT NULL,
	product_count INT NOT NULL,
	customer_id VARCHAR(255) NOT NULL,
	price DECIMAL NOT NULL,
	PRIMARY KEY(order_id, product_id, customer_id),
	FOREIGN KEY (order_id) REFERENCES product_order(order_id),
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (customer_id) REFERENCES customer(phone)
)Engine = InnoDB