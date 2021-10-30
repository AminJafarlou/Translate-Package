test('length', () => {
  const fa = require('./fa');
  const en = require('./en');

  expect(Object.keys(en).length).toBe(Object.keys(fa).length);
});
