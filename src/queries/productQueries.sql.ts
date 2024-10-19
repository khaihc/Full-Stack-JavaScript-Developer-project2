export const productQueries = {
    SELECT_ALL_PRODUCTS: `SELECT * FROM products`,
    
    SELECT_PRODUCT_BY_ID: `SELECT * FROM products WHERE id = $1`,
    
    CHECK_PRODUCT_EXISTENCE: `SELECT EXISTS (SELECT 1 FROM products WHERE name = $1) AS exists;`,
    
    INSERT_PRODUCT: `
        INSERT INTO products (name, price, category)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
    `,
    
    DELETE_PRODUCT: `
        DELETE FROM products 
        WHERE id = $1
        RETURNING *;
    `,
    
    UPDATE_PRODUCT: (setClause: string) => `
        UPDATE products 
        SET ${setClause} 
        WHERE id = $1 
        RETURNING *;
    `,
    
    SELECT_BY_CATEGORY: `SELECT * FROM products WHERE category = $1`
};