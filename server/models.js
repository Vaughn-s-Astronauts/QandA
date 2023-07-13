const db = require('./db.js');

exports.getAll = () => {
  return db.query("SELECT * from products;", (err, res) => {
    if (err) {
      return (err)
    } else {
      return (res.rows);
      db.end();
    }
  })
}

exports.getProduct = (product_id) => {
  return db.query(`SELECT * from products WHERE product_id=${product_id};`, (err, res) => {
    if (err) {
      return (err)
    } else {
      return (res.rows);
      db.end();
    }
  })
}

exports.addProduct = ({id, name, slogan, description, category, default_price}) => {
  return db.query(`INSERT INTO products VALUES (${id}, {${name}, ${slogan}, ${description}, ${category}, ${default_price})`, (err, res) => {
    if (err) {
      return (err)
    } else {
      console.log('record added successfully')
      db.end();
    }
  })
}

exports.addAllProducts = (arrObj) => {
  db.query(`DROP TABLE IF EXISTS products;`)

  .then(() => {
    console.log('table products dropped if existed.')
    db.query(`CREATE TABLE products (product_id integer PRIMARY KEY, name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price integer);`)
  })

  .then(() => {
    console.log('table products created.')
    return db.query(`INSERT INTO products (product_id, name, slogan, description, category, default_price) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(id integer, name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added successfully to products table.`)
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}

exports.addAllQuestions = (arrObj) => {
  db.query(`DROP TABLE IF EXISTS questions;`)

  .then(() => {
    console.log('table questions dropped if existed.')
    db.query(`CREATE TABLE questions (question_id VARCHAR(255) PRIMARY KEY, product_id VARCHAR(255) REFERENCES products (product_id), body VARCHAR(255), date_written VARCHAR(255), asker_name VARCHAR(1023), asker_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then(() => {
    console.log('table questions created.')
    return db.query(`INSERT INTO questions (question_id, product_id, body, date_written, asker_name, asker_email, reported, helpful) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(question_id VARCHAR(255) PRIMARY KEY, product_id VARCHAR(255) REFERENCES products (product_id), body VARCHAR(255), date_written VARCHAR(255), asker_name VARCHAR(1023), asker_email VARCHAR(255), reported BOOLEAN, helpful integer);`)
  })

  .then((res) => {
    console.log(`${res.rowCount} records added successfully to questions table.`)
    db.end();
  })

  .catch((err) => {
    console.log(err);
  })
}

