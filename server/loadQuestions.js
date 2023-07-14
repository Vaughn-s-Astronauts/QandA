const readStream = require('./ETL.js')
const Import = require('./models.js')

let questionData = '';

readStream.questions.on('data', (chunk) => {
  questionData += chunk;
})

readStream.questions.on('end', () => {
  let arrObj = [];
  let lines = questionData.split('\n');
  let headers = lines[0].split(',');
  for (let r = 1; r < lines.length; r++) {
    let rowData = lines[r].split('","').join('~');
    rowData = rowData.split('",').join('~');
    rowData = rowData.split(',"').join('~');
    rowData = rowData.split('~');
    let temp = rowData[0].split(',');
    rowData.splice(0, 1, temp[0], temp[1]);
    temp = rowData[6].split(',');
    rowData.splice(6, 1, temp[0], temp[1]);
    arrObj[r-1] = {};
    for(let c = 0; c < headers.length; c++) {
      arrObj[r-1][headers[c]] = rowData[c].split('\'').join('`').split('\"').join('');
    }
  }
  Import.addAllQuestions(arrObj.slice(0,1100000), arrObj.slice(1100000));
})



