const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  connectionLimit: 10,
});

module.exports = {
  query: async (sql, params) => {
    const [results] = await pool.execute(sql, params);
    return results;
  },
};