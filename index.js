'use strict';
const fs = require('fs');
const path = require('path');
const translate = require('translate-google');
const faObj = require('./test/fa');

async function app() {
  const configString = fs.readFileSync('./localize.config.json');
  const config = configString && JSON.parse(configString);

  const sourceLanguage = config.source.split('/').reverse()[0].split('.')[0];

  config.languages.forEach(async (language) => {
    const fileName = `${language}.js`;
    const isFileExisting = fs.existsSync(path.resolve(config.out, fileName));

    // Deleting Keys that already exist in en.js, to prevent unnecessary API calls
    const enObj = isFileExisting
      ? require(path.resolve(config.out, fileName))
      : {};
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

      const result = await translate(slicedObj, {
        from: sourceLanguage,
        to: language,
      });
      Object.assign(reducer, result);
    }

    // Concat previous en object with new results
    let finalResult = Object.assign(reducer, enObj);

    // Sorting the object before writing it in the outDir
    finalResult = Object.keys(reducer)
      .sort()
      .reduce((obj, key) => {
        obj[key] = reducer[key];
        return obj;
      }, {});

    fs.writeFileSync(
      path.resolve(config.out, fileName),
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
  });
}

app();
