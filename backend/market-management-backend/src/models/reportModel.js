const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Function to get sales report
const getSalesReport = async () => {
    const query = `
        SELECT date, SUM(amount) as total
        FROM invoices
        GROUP BY date
        ORDER BY date;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

// Function to get inventory report
const getInventoryReport = async () => {
    const query = `
        SELECT productId, SUM(quantity) as quantity
        FROM orders
        GROUP BY productId;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

module.exports = {
    getSalesReport,
    getInventoryReport,
};