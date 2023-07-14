const readStream = require('./ETL.js')
const Import = require('./models.js')

let productData = '';

readStream.products.on('data', (chunk) => {
  productData += chunk;
})

readStream.products.on('end', () => {
  let arrObj = [];
  let lines = productData.split('\n');
  let headers = lines[0].split(',');
  for (let r = 1; r < lines.length; r++) {
    let rowData = lines[r].split('","').join('~');
    rowData = rowData.split('",').join('~');
    rowData = rowData.split(',"').join('~');
    rowData = rowData.split('~');
    arrObj[r - 1] = {};
    for(let c = 0; c < headers.length; c++) {
      arrObj[r - 1][headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
    }
  }
  Import.addAllProducts(arrObj)
})



// rs.answers.on('data', (chunk) => {
//   data += chunk;
// })





