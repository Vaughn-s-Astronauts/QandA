const fs = require('fs');
const util = require('util');
const Post = require('./models.js')

let data = '';

const productsFile = '/Users/brett.stgeorge/Downloads/product.csv';


const readStream = fs.createReadStream(productsFile, {encoding: 'utf8'});

readStream.on('data', (chunk) => {
  data += chunk;
})

readStream.on('end', () => {
  let arrObj = [];
  let lines = data.split('\n');
  let headers = lines[0].split(',');
  // arrObj[0] = headers;
  for (let r = 0; r < lines.length; r++) {
    let rowData = lines[r].split(',')
    arrObj[r] = {};
    // objElement = {};
    for(let c = 0; c < headers.length; c++) {
      arrObj[r][headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
      // objElement[headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
    }
    // arrObj.push(JSON.stringify(objElement))
  }
  Post.addAllProducts(arrObj);
})



