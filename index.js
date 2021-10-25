const fs = require('fs');
// import fa from './fa.js';

const initialObject = fs.readFileSync('./fa.js', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
});

const extractedObjectInString = initialObject
  .slice(initialObject.indexOf('{'), initialObject.indexOf('}') + 1)
  .replace(/^"(.*)"$/, '$1');

const getObjectFromString = (stringToParse) => {
  if (typeof stringToParse === 'string') {
    let currentKey = '';
    const keyValPairArr = stringToParse
      .replace('{', '')
      .replace('}', '')
      .split(':');
    return keyValPairArr.reduce((obj, current, index, arr) => {
      const previousKey = currentKey;
      const arrKeyVal = current.trim().split(',');
      currentKey = index !== arr.length - 1 ? arrKeyVal.pop().trim() : '';
      const previousVal = arrKeyVal.join(',');
      if (previousKey && previousVal !== '') obj[previousKey] = previousVal;
      return obj;
    }, {});
  } else {
    return stringToParse || {};
  }
};

const extractedObj = getObjectFromString(extractedObjectInString);

const results = {};
Object.keys(extractedObj).forEach((key) => {
  results[key] = 'XXX';
});
console.log(results);
// const finalObject = initialObject.replace('fa', 'en');
// fs.writeFile('./en.js', finalObject, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });
