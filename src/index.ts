'use strict';
import fs from 'fs';
import path from 'path';
import { format } from 'prettier';
//@ts-ignore
import translate from 'translate-google';

interface Config {
  source: string;
  out: string;
  languages: ('en' | 'fr')[];
}

async function generate() {
  const configString = fs.readFileSync('./localize.config.json');
  const config =
    configString && (JSON.parse(configString.toString()) as Config);

  if (!config) {
    console.log('localize.config.json Not found');
  }
  const source = require(path.resolve(config.source));

  const sourceLanguage = config.source.split('/').reverse()[0].split('.')[0];

  config.languages.forEach(async (language) => {
    const fileName = `${language}.js`;
    const isFileExisting = fs.existsSync(path.resolve(config.out, fileName));

    // Deleting Keys that already exist in en.js, to prevent unnecessary API calls
    const enObj = isFileExisting
      ? require(path.resolve(config.out, fileName))
      : {};

    const remainingKeys = Object.keys(source).filter(
      (key) => !Object.keys(enObj).includes(key)
    );
    const inputObject = remainingKeys.reduce((obj, item) => {
      obj[item] = source[item];
      return obj;
    }, {} as Record<string, string>);

    // Giving 50 items to translate in each API call, more than that will not work unfortunately!
    const reducer: Record<string, string> = {};
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
    finalResult = Object.keys(finalResult)
      .sort()
      .reduce((obj, key) => {
        obj[key] = finalResult[key];
        return obj;
      }, {} as Record<string, string>);

    fs.writeFileSync(
      path.resolve(config.out, fileName),
      format(
        `
      // This File is Auto-Generated don't change manually

        const en = ${JSON.stringify(finalResult)}

        module.exports = en;
      `,
        {
          filepath: path.resolve(config.out, fileName),
        }
      )
    );
  });
}

export { generate };
