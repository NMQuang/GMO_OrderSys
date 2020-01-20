// define sql about menu
const menuSql = {};

// Sql get all product by menuId
menuSql.getAllProduct = `
SELECT
	table1.id,
	table1.name,
	table1.image,
	table1.note,
	table1.price,
	table1.created_at,
	table2.count,
	table3.countAll
FROM
	(
	SELECT
		product.id,
		product.name,
		product.image,
		product.note,
		product.price,
		product.created_at 
	FROM
		menus menu
		JOIN menu_details detail ON menu.id = detail.menu_id 
		AND detail.delete_flag = 0
		JOIN products product ON detail.product_id = product.id 
		AND product.delete_flag = 0 
	WHERE
		menu.id = :menuId 
	) AS table1
	LEFT JOIN (
	SELECT
		item.product_id,
		COUNT( item.quantity ) AS count 
	FROM
		order_items AS item
		JOIN orders ON item.order_id = orders.id 
	WHERE
		orders.menu_id = :menuId 
	GROUP BY
		item.product_id 
	) AS table2 ON table1.id = table2.product_id
	LEFT JOIN (
	SELECT
		item.product_id,
		COUNT( item.quantity ) AS countAll
	FROM
		order_items AS item
		JOIN orders ON item.order_id = orders.id 
	GROUP BY
	item.product_id 
	) AS table3 ON table1.id = table3.product_id
`;

// Sql get all menu with amount product of menu with page
menuSql.getListMenuWithAmountProduct = `
SELECT
menu.id,
	menu.created_at,
	menu.valid_from,
	menu.valid_to,
	COUNT(detail.product_id) as product
FROM
menus menu
LEFT JOIN menu_details detail ON menu.id = detail.menu_id
WHERE :dateNow <= menu.valid_to 
GROUP BY menu.id
LIMIT :limit OFFSET :offset
`;
// SQL create menu
menuSql.createMenu = `
INSERT INTO menus(created_at, valid_from, valid_to)
VALUES(:createdAt, :validFrom,:validTo)
`;

// SQL edit menu
menuSql.editMenu = `
UPDATE menus
SET valid_to = :validTo,
    valid_from = :validFrom
WHERE menus.id = :menuId
`;

// SQL get menu
menuSql.getMenu = `
SELECT menus.id,
       menus.status,
       menus.valid_from,
       menus.valid_to
FROM menus
WHERE menus.id = :menuId
`;

// SQL get menu
menuSql.checkDuplicateValidFrom = `
SELECT COUNT(id) AS valid
FROM menus
WHERE DATE_FORMAT(valid_from, "%d/%m/%Y") = :validDate
`;

// SQL create menu detail
menuSql.createMenuDetail = `
INSERT INTO menu_details(menu_id, product_id, delete_flag)
VALUES(:menuId, :productId, 0)
`;
// Sql get all menu with amount product of menu
menuSql.getAllMenu = `
SELECT temp.id,
       menus.created_at,
       menus.valid_from,
       menus.valid_to,
       temp.product
FROM menus
JOIN
  (SELECT menu.id,
          COUNT(detail.product_id) AS product
   FROM menus menu
   LEFT JOIN menu_details detail ON menu.id = detail.menu_id
   AND detail.delete_flag = 0
   GROUP BY menu.id) AS temp
ON temp.id = menus.id
ORDER BY menus.created_at DESC
`;

//SQL summary order, product
menuSql.summary = `
SELECT
     products.id,
     products.name,
     products.image,
     products.note,
     products.price,
     products.created_at,
     temp.count AS quantity
FROM products
JOIN
  (SELECT order_items.product_id AS product_id,
          COUNT(order_items.order_id) AS count
   FROM order_items
   JOIN orders ON order_items.order_id = orders.id
	 JOIN menu_details detail ON detail.menu_id = orders.menu_id
	 AND detail.product_id = order_items.product_id
   WHERE orders.menu_id = :menuId
	 AND detail.delete_flag = 0

   GROUP BY order_items.product_id) AS temp ON products.id = temp.product_id
`;

//SQL select list username by product
menuSql.listInfoUserByProduct = `
SELECT 
       users.id,
       users.code,
       users.name,
       temp2.created_at
FROM
  (SELECT
          temp.product_id AS product_id,
          temp.user_id AS user_id,
          temp.created_at AS created_at
   FROM products
   JOIN
     (SELECT order_items.product_id AS product_id,
             orders.user_id AS user_id,
             orders.created_at AS created_at
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id
      WHERE orders.menu_id = :menuId ) AS temp ON products.id = temp.product_id) AS temp2
JOIN users ON temp2.user_id = users.id
WHERE temp2.product_id = :productId
`;

//SQL check valid order
menuSql.validOrderMenu = `
SELECT COUNT(1) as valid
FROM menus
WHERE menus.id = :menuId 
      AND     :createTime
      BETWEEN menus.valid_from
      AND     menus.valid_to
`;

// SQL select all menu
menuSql.listAllMenu = `
SELECT id,
       created_at,
       valid_from,
       valid_to
FROM menus
`;

// SQL select all product
menuSql.listAllProduct = `
SELECT id,
       name,
       image,
       note,
       price,
       created_at
FROM products
WHERE delete_flag = 0
`;

// SQL get product user order
menuSql.getProductUserOrder = `
SELECT products.id,
       products.name,
       products.image,
       products.note,
       products.price,
       products.created_at,
       order_items.order_id,
       order_items.quantity
FROM order_items
JOIN orders ON order_items.order_id = orders.id
JOIN products ON products.id = order_items.product_id
AND products.delete_flag = 0
JOIN menu_details detail ON detail.menu_id = orders.menu_id
AND detail.product_id = order_items.product_id
AND detail.delete_flag = 0
WHERE orders.menu_id = :menuId
AND orders.user_id = :userId
`;

// SQL get list menu no expired by product id
menuSql.getListMenuByProduct = `
SELECT menu.id
FROM menus menu
JOIN menu_details detail ON menu.id = detail.menu_id
AND detail.delete_flag = 0
AND detail.product_id = :productId
AND menu.valid_to >= :dateNow
GROUP BY menu.id
`;

// SQL set delete_flag menu_detail by menu_id and product_id
menuSql.deleteMenuDetail = `
UPDATE menu_details
SET delete_flag = 1
WHERE menu_id IN (:listMenu)
AND product_id = :productId
`;

// SQL updateMenuDetail by menuId
menuSql.updateMenuDetail = `
UPDATE menu_details
SET delete_flag = 1
WHERE menu_id = :menuId
`;

// SQL get product in menu
menuSql.getProductInMenu = `
SELECT products.id,
       products.name,
       products.image,
       products.note,
       products.price,
       products.created_at
FROM products
JOIN menu_details detail ON detail.product_id = products.id
AND detail.menu_id = :menuId
AND detail.delete_flag = 0
AND products.delete_flag = 0
`;

// SQL close menu (set status = 0)
menuSql.closeMenu = `
UPDATE menus
SET status = 0
WHERE id = :menuId
`;

// SQL get menu detail when close order
menuSql.getSummaryMenu = `
SELECT
	detail.menu_id,
	product.name,
	product.price,
	temp.count AS quantity
FROM
	menu_details detail
LEFT JOIN (
	SELECT
		order_items.product_id AS product_id,
		COUNT(order_items.order_id) AS count
	FROM
		order_items
	JOIN orders ON order_items.order_id = orders.id
	WHERE
		orders.menu_id = :menuId
	GROUP BY
		order_items.product_id
) AS temp ON detail.product_id = temp.product_id
JOIN products product ON detail.product_id = product.id
WHERE
	detail.menu_id = :menuId
AND detail.delete_flag = 0
`;

menuSql.insertSummary = `
INSERT INTO summaries(menu_id, product_name, quantity, total, created_at)
VALUES(:menuId, :name, :quantity, :total, :createAt)
`;

menuSql.getSummaryDetail = `
SELECT summaries.id,
       summaries.product_name,
       summaries.quantity,
       summaries.total,
       summaries.created_at
FROM summaries
WHERE summaries.menu_id = :menuId
`;

// SQL get list menu by product id
menuSql.getListMenuByProductId = `
SELECT menu.id
FROM menus menu
JOIN menu_details detail ON menu.id = detail.menu_id
AND detail.product_id = :productId
GROUP BY menu.id
`;

// Sql get menu by id with amount product of menu
menuSql.getMenuById = `
SELECT temp.id,
       menus.created_at,
       menus.valid_from,
       menus.valid_to,
       temp.product
FROM menus
JOIN
  (SELECT menu.id,
          COUNT(detail.product_id) AS product
   FROM menus menu
   LEFT JOIN menu_details detail ON menu.id = detail.menu_id
   AND detail.delete_flag = 0
   GROUP BY menu.id) AS temp
ON temp.id = menus.id
WHERE menus.id = :menuId
ORDER BY menus.created_at DESC
`;

export default menuSql;
