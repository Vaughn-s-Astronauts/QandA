const readStream = require('./ETL.js')
const Import = require('./models.js')

let answerDataArr = [];
let fragments = [];

readStream.answers.on('data', (chunk) => {
    answerDataArr.push(chunk);
})


readStream.answers.on('end', () => {
  let chunkLength = Math.floor(answerDataArr.length / 3);
  let chunk1 = answerDataArr.slice(0, chunkLength).join('');
  let chunk2 = answerDataArr.slice(chunkLength, chunkLength * 2).join('');
  let chunk3 = answerDataArr.slice(chunkLength * 2).join('');
  let arrObj = [];

  // change chunk to 1 or 2 or 3
  let lines = chunk3.split('\n');

  // below two lines only for chunk1
  // fragments.push(lines.pop());
  // lines.shift();

  // below line only for chunk2
  // fragments.push(lines.shift());
  // fragments.push(lines.pop());

  // below line only for chunk3
  fragments.push(lines.shift());

  let headers = ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful']
  for (let r = 0; r < lines.length; r++) {
    let rowData = lines[r].split('","').join('~');
    rowData = rowData.split('",').join('~');
    rowData = rowData.split(',"').join('~');
    rowData = rowData.split('null,').join('~');
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
  console.log('fragments: ', fragments);

  // select either addFirstAnswers or addAppendAnswers
  Import.addAppendAnswers(arrObj);
})



