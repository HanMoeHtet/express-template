import { STORAGE_PATH } from '@src/config/paths.config';
import {
  getRelativePublicPathFromStoragePath,
  getStoragePathFromRelativePublicPath,
} from '@src/utils/paths.util';
import path from 'path';

test('getPublicPathFromStoragePath', () => {
  const randomStr = Math.random().toString();

  const storagePath = path.join(STORAGE_PATH, 'public/avatars', randomStr);

  expect(getRelativePublicPathFromStoragePath(storagePath)).toEqual(
    `/storage/avatars/${randomStr}`
  );
});

test('getStoragePathFromRelativePublicPath', () => {
  const randomStr = Math.random().toString();

  const relativePublicPath = `/storage/avatars/${randomStr}`;

  expect(getStoragePathFromRelativePublicPath(relativePublicPath)).toEqual(
    path.join(STORAGE_PATH, 'public/avatars', randomStr)
  );
});
