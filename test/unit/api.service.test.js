import * as apiService from '@src/services/api.service';

test('Api service susses should return Success!', () => {
  expect(apiService.success()).toBe('Success!');
});
