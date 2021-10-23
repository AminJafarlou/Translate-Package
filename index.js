const fs = require('fs');
// import fa from './fa.js';

const initialObject = fs.readFileSync('./fa.js', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
});

const extractedObject = initialObject.slice(
  initialObject.indexOf('{'),
  initialObject.indexOf('}') + 1
);
console.log(extractedObject, typeof extractedObject);

const finalObject = initialObject.replace('fa', 'en');

fs.writeFile('./en.js', finalObject, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});
