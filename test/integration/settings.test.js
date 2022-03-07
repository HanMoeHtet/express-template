test('Default time zone is UTC', () => {
  expect(new Date().getTimezoneOffset()).toBe(0);
});
