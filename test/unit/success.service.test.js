import { initLang } from '@src/config/lang.config';
import * as successService from '@src/services/success.service';

beforeAll(async () => {
  await initLang();
});

test('Api service susses should return Success!', () => {
  expect(successService.success()).toBe('Success!');
});
