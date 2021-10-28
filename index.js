'use strict';
const fs = require('fs');
const translate = require('translate-google');
const faObj = require('./fa');

async function app() {
  const isFileExisting = fs.existsSync('./en.js');

  // Deleting Keys that already exist in en.js, to prevent unnecessary API calls
  const enObj = isFileExisting ? require('./en') : {};
  const remainingKeys = Object.keys(faObj).filter(
    (key) => !Object.keys(enObj).includes(key)
  );
  const inputObject = remainingKeys.reduce((obj, item) => {
    obj[item] = faObj[item];
    return obj;
  }, {});

  // Giving 50 items to translate in each API call, more than that will not work unfortunately!
  const reducer = {};
  for (let i = 0; i < Object.keys(inputObject).length; i += 50) {
    const slicedObj =
      i + 50 > Object.keys(inputObject).length - 1
        ? Object.entries(inputObject)
            .slice(i, Object.keys(inputObject).length)
            .reduce((obj, [key, value]) => {
              return (obj = { ...obj, [key]: value });
            }, {})
        : Object.entries(inputObject)
            .slice(i, i + 50)
            .reduce((obj, [key, value]) => {
              return (obj = { ...obj, [key]: value });
            }, {});

    const result = await translate(slicedObj, { from: 'fa', to: 'en' });
    Object.assign(reducer, result);
  }

  // Concat previous en object with new results
  // console.log(enObj, 'enObj');
  // console.log(reducer, 'reducer');
  let finalResult = Object.assign(reducer, enObj);
  console.log('finalResult', typeof finalResult);

  // Sorting the object before writing it in the outDir
  finalResult = Object.keys(reducer)
    .sort()
    .reduce((obj, key) => {
      obj[key] = reducer[key];
      return obj;
    }, {});

  fs.writeFileSync(
    './en.js',
    `
    const en = ${JSON.stringify(finalResult)}

    module.exports = en;
    `,
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
}

app();
