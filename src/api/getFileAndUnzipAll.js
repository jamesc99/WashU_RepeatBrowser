import axios from 'axios';
// import pako from 'pako';
// const http = require('http');
// const decompressResponse = require('decompress-response');

export async function getFileAndUnzipAll(DATASET, KEY, SUBFAMILIES) {
  const URL = DATASET[KEY];
  let response = await axios.get(URL).then(res => res.data);
  //console.log('response: ' + response);
  const result = { id: DATASET.id, body: response};

  return result;
}

// function reshapeForResponse(input, SUBFAMILIES) {
//   const tmp = {

//   }
//   SUBFAMILIES.map(subfamily => {

//   })
// }

function responseParse(input, dataset, key) {
  const myArray = input.split('\n');
  // console.log(dataset)
  const parsedStringList = myArray.map(entry => responseParseRow(entry)).filter(d => d);
  const tmp = {}
  parsedStringList.forEach(item => {
      const { key, values } = item;
      tmp[key] = {...values};
  })
  return tmp;
}

function responseParseRow(input) {

  const myArray = input.split('\t');
if (myArray.length === 0) {
  return null;
}
var firstItem = myArray[0];
var lastItem = myArray[myArray.length - 1];

  const parsedItem = getJSON(lastItem);

  if (parsedItem !== null) {
      const { all_reads_RPKM, all_reads_RPM, unique_reads_RPKM, unique_reads_RPM, subfamily } = parsedItem;
      var objOutput = {
          key: firstItem,
          values : { all_reads_RPKM, all_reads_RPM, unique_reads_RPKM, unique_reads_RPM }
      };
      return objOutput;
  } 
      
  return null;
}

function getJSON(str) {
  try {
      return JSON.parse(str);
  } catch (error) {
      return null;
  }
}

