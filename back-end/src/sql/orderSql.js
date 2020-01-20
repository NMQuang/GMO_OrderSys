// define sql for order
const orderSql = {};

// count amount of user, who has ordered
orderSql.countOrderByUser = `
SELECT
	count( item.order_id ) as count
FROM
	order_items item
JOIN orders ON item.order_id = orders.id 
JOIN menus ON menus.id = orders.menu_id
JOIN menu_details on menus.id = menu_details.menu_id
JOIN products ON item.product_id = products.id
WHERE
    orders.user_id = :userId
AND menus.id = :menuId
AND menu_details.product_id = item.product_id
AND menu_details.delete_flag = 0
AND products.delete_flag = 0
`;

// insert into order
orderSql.insertIntoOrder = `
INSERT INTO orders(user_id, status, menu_id, created_at)
VALUES (:userId, 'Done', :menuId, :createTime )
`;

// insert into order_item
orderSql.insertIntoOrderItem = `
INSERT INTO order_items (order_id, product_id, quantity )
VALUES (:orderId, :productId, :quantity )
`;

// Sql get order by menuId
orderSql.getOrderByUser = `
SELECT
	orders.id AS orderId,
	products.id AS productId,
	products.name,
	products.image,
	products.note,
	products.price,
	products.created_at,
	item.quantity
FROM
    order_items AS item
JOIN orders        ON item.order_id           = orders.id
JOIN products      ON item.product_id         = products.id
AND products.delete_flag = 0
WHERE orders.menu_id = :menuId
AND   orders.user_id = :userId
`;

// update order item
orderSql.updateOrderItem = `
UPDATE order_items item
SET item.product_id = :productId
WHERE item.order_id = :orderId
`
export default orderSql;