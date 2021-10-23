const fs = require('fs');

try {
  const initialObject = fs.readFileSync('./fa.js', 'utf8');
  return initialObject;
} catch (err) {
  console.log(err);
}

const finalObject = initialObject;
console.log(finalObject, 'XXX');

// fs.writeFile('./en.js', initialObject(), { flag: 'a+' }, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });
