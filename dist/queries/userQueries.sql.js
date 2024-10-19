"use strict";
exports.__esModule = true;
exports.userQueries = void 0;
exports.userQueries = {
    SELECT_ALL_USERS: "SELECT * FROM users",
    SELECT_USER_BY_ID: "SELECT * FROM users WHERE id = $1",
    CHECK_USER_EXISTENCE: "SELECT EXISTS (SELECT 1 FROM users WHERE user_name = $1) AS exists;",
    INSERT_USER: "\n        INSERT INTO users (first_name, last_name, user_name, password)\n        VALUES ($1, $2, $3, $4)\n        ON CONFLICT (user_name) DO NOTHING\n        RETURNING *;\n    ",
    DELETE_USER: "\n        DELETE FROM users \n        WHERE id = $1\n        RETURNING *;\n    ",
    UPDATE_USER: function (setClause) { return "\n        UPDATE users \n        SET ".concat(setClause, " \n        WHERE id = $1 \n        RETURNING *;\n    "); }
};
