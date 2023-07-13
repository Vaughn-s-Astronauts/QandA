const fs = require('fs');
const util = require('util');
const Post = require('./models.js')
const Promise = require("bluebird");

let productData = '';
let questionData = '';
let answerData = '';

const productsFile = '/Users/brett.stgeorge/Downloads/product.csv';
const questionsFile = '/Users/brett.stgeorge/Downloads/questions.csv';
const answersFile = '/Users/brett.stgeorge/Downloads/answers.csv';

const readStream = {};
readStream.products = fs.createReadStream(productsFile, {encoding: 'utf8'});
// readStream.questions = fs.createReadStream(productsFile, {encoding: 'utf8'});
// readStream.answers = fs.createReadStream(productsFile, {encoding: 'utf8'});

const rs = Promise.promisifyAll(readStream, { multiArgs: true });

rs.products.on('data', (chunk) => {
  productData += chunk;
})
// rs.questions.on('data', (chunk) => {
//   data += chunk;
// })
// rs.answers.on('data', (chunk) => {
//   data += chunk;
// })

rs.products.on('end', () => {
  let arrObj = [];
  let lines = productData.split('\n');
  let headers = lines[0].split(',');
  for (let r = 1; r < lines.length; r++) {
    let rowData = lines[r].split(',"').join('~');
    rowData = rowData.split('","').join('~');
    rowData = rowData.split('",').join('~');
    rowData = rowData.split('~');
    arrObj[r - 1] = {};
    for(let c = 0; c < headers.length; c++) {
      arrObj[r - 1][headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
    }
  }
  Post.addAllProducts(arrObj);
})

// readStreamQuestions.on('end', () => {
//   let arrObj = [];
//   let lines = data.split('\n');
//   let headers = lines[0].split(',');
//   // arrObj[0] = headers;
//   for (let r = 0; r < lines.length; r++) {
//     let rowData = lines[r].split(',')
//     arrObj[r] = {};
//     // objElement = {};
//     for(let c = 0; c < headers.length; c++) {
//       arrObj[r][headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
//       // objElement[headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
//     }
//     // arrObj.push(JSON.stringify(objElement))
//   }
//   Post.addAllQuestions(arrObj);
// })



