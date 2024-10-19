export const userQueries = {
    SELECT_ALL_USERS: `SELECT * FROM users`,
    
    SELECT_USER_BY_ID: `SELECT * FROM users WHERE id = $1`,
    
    CHECK_USER_EXISTENCE: `SELECT EXISTS (SELECT 1 FROM users WHERE user_name = $1) AS exists;`,
    
    INSERT_USER: `
        INSERT INTO users (first_name, last_name, user_name, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_name) DO NOTHING
        RETURNING *;
    `,
    
    DELETE_USER: `
        DELETE FROM users 
        WHERE id = $1
        RETURNING *;
    `,
    
    UPDATE_USER: (setClause: string) => `
        UPDATE users 
        SET ${setClause} 
        WHERE id = $1 
        RETURNING *;
    `
};