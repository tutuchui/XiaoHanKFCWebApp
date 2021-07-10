DROP TABLE IF EXISTS order_status; 

CREATE TABLE order_status (
	order_id VARCHAR(255) NOT NULL,
	customer_id VARCHAR(255) NOT NULL,
	customer_name VARCHAR(255) NOT NULL,
	order_status INT NOT NULL,
	payment_status INT NOT NULL,
	update_time TIMESTAMP NOT NULL,
	PRIMARY KEY(order_id, update_time),
	FOREIGN KEY (order_id) REFERENCES product_order(order_id) ON DELETE CASCADE
)engine = InnoDB;