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

  // let dropTableProducts = () => {
    db.query(`DROP TABLE IF EXISTS products;`)
    // , (err,res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('table products dropped if existed.');
    //   }
    // })
  // }

  // let createTableProducts = () => {
    .then(() => {
    console.log('table products dropped if existed.')
    return db.query(`CREATE TABLE products (id VARCHAR(255), name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price VARCHAR(255));`)
    // , (err,res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('table products created.')
    //   }
    // })
  // }
})

  // let populateTableProducts = (arrObj) => {
    .then(() => {
    console.log('table products created.')
    return db.query(`INSERT INTO products (id, name, slogan, description, category, default_price) SELECT * FROM json_to_recordset('${JSON.stringify(arrObj)}') as x(id VARCHAR(255), name VARCHAR(255), slogan VARCHAR(255), description VARCHAR(1023), category VARCHAR(255), default_price VARCHAR(255));`)
    // , (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     db.query('SELECT COUNT(*) FROM products;', (err, res) => {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         console.log(`${res.rows[0].count} records added successfully`)
    //         db.end();
    //       }
    //     })
    //   }
    // });
  // }
})
.then(() => {
  console.log('records added successfully.')
  db.end();
})
.catch((err) => {
  console.log(err);
})

  // dropTableProducts();
  // createTableProducts();
  // populateTableProducts(arrObj);

  // dropTableProducts().then((res) => {
  //   .then((arrObj) => {
  //   console.log('table products dropped if existed.');
  //   createTableProducts();
  // }).then((res) => {
  //   console.log('table products created.');
  //   populateTableProducts(arrObj);
  // }).then((res) => {
  //   console.log(`${res.rows[0].count} records added successfully`);
  //   db.end();
  // }).catch((err) => {
  //   console.log(err);
  // })
}

