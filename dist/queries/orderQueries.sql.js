"use strict";
exports.__esModule = true;
exports.orderQueries = void 0;
exports.orderQueries = {
    SELECT_ALL_ORDERS: "SELECT * FROM orders",
    INSERT_ORDER: "\n        WITH new_order AS (\n            INSERT INTO orders (product_id, quantity, user_id, status)\n            VALUES ($1, $2, $3, $4) RETURNING id\n        )\n        INSERT INTO order_product (order_id, product_id) \n        VALUES ((SELECT id FROM new_order), $1) \n        RETURNING *;\n    ",
    SELECT_ORDERS_BY_USER: "\n        SELECT orders.id, orders.product_id, orders.user_id, orders.quantity, orders.status\n        FROM orders\n        WHERE user_id = $1\n    ",
    SELECT_COMPLETED_ORDERS_BY_USER: "\n        SELECT orders.id, orders.product_id, orders.user_id, orders.quantity, orders.status\n        FROM orders\n        WHERE user_id = $1 AND status = 'complete'\n    ",
    UPDATE_ORDER_STATUS: "\n        UPDATE orders\n        SET status = 'complete'\n        WHERE id = $1\n        RETURNING *;\n    ",
    CHECK_ORDER_EXISTENCE: "SELECT EXISTS (SELECT 1 FROM orders WHERE id = $1) AS exists;",
    DELETE_ORDER: "DELETE FROM orders WHERE id = $1"
};
