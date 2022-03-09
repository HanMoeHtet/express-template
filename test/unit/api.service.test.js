import { init as initLang } from '@src/config/lang.config';
import * as apiService from '@src/services/api.service';

beforeAll(async () => {
  await initLang();
});

test('Api service susses should return Success!', () => {
  expect(apiService.success()).toBe('Success!');
});
