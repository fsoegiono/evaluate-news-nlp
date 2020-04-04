import { checkForName } from '../js/nameChecker'

test('name checker Picard', () => {
  expect(checkForName('Picard')).toBe(true);
});

test('name checker test', () => {
  expect(checkForName('test')).toBe(false);
});
