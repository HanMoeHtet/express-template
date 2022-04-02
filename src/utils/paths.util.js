import { STORAGE_PATH } from '@src/config/paths.config';
import path from 'path';

export const getRelativePublicPathFromStoragePath = (
  /** @type {string} */ storagePath
) => {
  return path.join(
    '/storage',
    path.relative(path.join(STORAGE_PATH, 'public'), storagePath)
  );
};

export const getStoragePathFromRelativePublicPath = (
  /** @type {string} */ relativePublicPath
) => {
  return path.join(
    STORAGE_PATH,
    'public',
    path.relative('/storage', relativePublicPath)
  );
};
