DROP TABLE IF EXISTS product_order;

CREATE TABLE product_order(
	order_id VARCHAR(255) PRIMARY KEY NOT NULL,
	customer_id VARCHAR(255) NOT NULL,
	customer_name VARCHAR(255) NOT NULL,
	payment_status INT NOT NULL,
	order_status INT NOT NULL,
	total_price DECIMAL NOT NULL,
	order_date TIMESTAMP NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES customer(phone)
)Engine = InnoDB