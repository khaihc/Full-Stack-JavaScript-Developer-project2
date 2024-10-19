"use strict";
exports.__esModule = true;
exports.productQueries = void 0;
exports.productQueries = {
    SELECT_ALL_PRODUCTS: "SELECT * FROM products",
    SELECT_PRODUCT_BY_ID: "SELECT * FROM products WHERE id = $1",
    CHECK_PRODUCT_EXISTENCE: "SELECT EXISTS (SELECT 1 FROM products WHERE name = $1) AS exists;",
    INSERT_PRODUCT: "\n        INSERT INTO products (name, price, category)\n        VALUES ($1, $2, $3)\n        ON CONFLICT (name) DO NOTHING\n        RETURNING *;\n    ",
    DELETE_PRODUCT: "\n        DELETE FROM products \n        WHERE id = $1\n        RETURNING *;\n    ",
    UPDATE_PRODUCT: function (setClause) { return "\n        UPDATE products \n        SET ".concat(setClause, " \n        WHERE id = $1 \n        RETURNING *;\n    "); },
    SELECT_BY_CATEGORY: "SELECT * FROM products WHERE category = $1"
};
