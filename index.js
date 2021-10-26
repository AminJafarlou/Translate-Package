'use strict';
const fs = require('fs');
const translate = require('translate-google');
const extractedObj = require('./fa');

async function app() {
  // const isFileExisting = await fs.accessSync();

  const reducer = {};
  for (let i = 0; i < Object.keys(extractedObj).length; i += 50) {
    const slicedObj =
      i + 50 > Object.keys(extractedObj).length - 1
        ? Object.entries(extractedObj)
            .slice(i, Object.keys(extractedObj).length)
            .reduce((obj, [key, value]) => {
              return (obj = { ...obj, [key]: value });
            }, {})
        : Object.entries(extractedObj)
            .slice(i, i + 50)
            .reduce((obj, [key, value]) => {
              return (obj = { ...obj, [key]: value });
            }, {});

    const result = await translate(slicedObj, { from: 'fa', to: 'en' });
    console.log(result, i);
    Object.assign(reducer, result);
  }
  console.log(reducer, 'XXX');

  fs.writeFileSync(
    './en.js',
    `
    const en = ${JSON.stringify(reducer)}

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
