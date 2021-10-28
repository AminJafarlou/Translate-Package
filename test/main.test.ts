test('length', () => {
  const fa = require('./fa');
  const en = require('./en');
  const fr = require('./fr');

  expect(Object.keys(en).length).toBe(Object.keys(fa).length);
  expect(Object.keys(fr).length).toBe(Object.keys(fa).length);
});
