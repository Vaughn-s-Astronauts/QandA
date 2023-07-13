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
  return db.query(`INSERT INTO products (id, name, slogan, description, category, default_price) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(id VARCHAR(255), name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price VARCHAR(255));`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('records added successfully')
      db.end();
    }
  })
}

