const dotenv = require('dotenv')
dotenv.config();
const { Client } = require('pg')

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Database connection established...')
    // db.query('SELECT * FROM products;', (err, res) => {
    //   console.log(res.rows);
    // });
  }
})

module.exports = db;





