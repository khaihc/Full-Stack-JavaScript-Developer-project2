export const orderQueries = {
    SELECT_ALL_ORDERS: `SELECT * FROM orders`,
    
    INSERT_ORDER: `
        WITH new_order AS (
            INSERT INTO orders (product_id, quantity, user_id, status)
            VALUES ($1, $2, $3, $4) RETURNING id
        )
        INSERT INTO order_product (order_id, product_id) 
        VALUES ((SELECT id FROM new_order), $1) 
        RETURNING *;
    `,
    
    SELECT_ORDERS_BY_USER: `
        SELECT orders.id, orders.product_id, orders.user_id, orders.quantity, orders.status
        FROM orders
        WHERE user_id = $1
    `,
    
    SELECT_COMPLETED_ORDERS_BY_USER: `
        SELECT orders.id, orders.product_id, orders.user_id, orders.quantity, orders.status
        FROM orders
        WHERE user_id = $1 AND status = 'complete'
    `,
    
    UPDATE_ORDER_STATUS: `
        UPDATE orders
        SET status = 'complete'
        WHERE id = $1
        RETURNING *;
    `,
    
    CHECK_ORDER_EXISTENCE: `SELECT EXISTS (SELECT 1 FROM orders WHERE id = $1) AS exists;`,
    
    DELETE_ORDER: `DELETE FROM orders WHERE id = $1`
};