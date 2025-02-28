// db.js
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'ecommerce-kecil',
password: '1',
port: 5432,
});
module.exports = pool;