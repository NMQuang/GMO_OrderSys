// defind SQL of product
const productSql = {};

// Sql get product detail by product id and order id
productSql.getProductDetail = `
SELECT
	products.id,
	products.name,
	products.image,
    products.note,
    products.price,
	products.created_at,
	item.quantity
FROM
    order_items AS item
JOIN products ON item.product_id = products.id
AND products.delete_flag = 0
WHERE item.order_id = :orderId
AND   products.id = :productId
`;

// SQL get product detail
productSql.productDetail = `
SELECT products.id,
       products.name,
       products.image,
       products.note,
       products.price,
       products.created_at
FROM products
WHERE products.id = :productId
AND products.delete_flag = 0
`;

productSql.getListMenu = `
SELECT menu_details.menu_id,
       menus.created_at,
       menus.valid_from,
       menus.valid_to
FROM products
JOIN menu_details ON products.id = menu_details.product_id
JOIN menus ON menus.id = menu_details.menu_id
WHERE product_id = :productId
`

//SQL select list username by product
productSql.getListOrder = `
SELECT users.code,
       users.name
FROM
  (SELECT temp.product_id AS product_id,
          temp.user_id AS user_id,
          temp.created_at AS created_at
   FROM products
   JOIN
     (SELECT order_items.product_id AS product_id,
             orders.user_id AS user_id,
             orders.created_at AS created_at
      FROM order_items
      JOIN orders ON order_items.order_id = orders.id) AS TEMP ON products.id = temp.product_id) AS temp2
JOIN users ON temp2.user_id = users.id
WHERE temp2.product_id = :productId
`;

// SQL get list user
productSql.getListUser = `
SELECT users.code,
       users.name,
       temp.user_id
FROM users
JOIN
  (SELECT orders.user_id
   FROM orders
   JOIN order_items item ON orders.id = item.order_id
   AND item.product_id = :productId
   WHERE orders.menu_id = :menuId) AS temp ON users.id = temp.user_id
`;

// SQL delete product
productSql.deleteProduct = `
UPDATE products
SET delete_flag = 1
WHERE id = :productId
`

// SQL create product
productSql.createProduct = `
INSERT INTO products(name, image, note, price, created_at, delete_flag)
VALUES ( :name, :image, :note, :price, :createTime, 0)
`;

// SQL edit detail of product
productSql.editProduct = `
UPDATE products
SET products.name = :name,
    products.image = :image,
    products.note = :note,
    products.price = :price,
    products.created_at = :createTime
WHERE products.id = :productId
`;

//SQL select id all product
productSql.getProductById = `
SELECT id,
       image
FROM products
WHERE id = :productId
`;

//SQL check product name exist with different id
productSql.countProductByNameWithDifferentId = `
SELECT id
FROM products
WHERE id != :productId
AND name = :name
AND delete_flag = 0
`

export default productSql;