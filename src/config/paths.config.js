import path from 'path';
import { ENV } from './env.config';

/**
 * Path to project root
 */
export const ROOT_PATH = path.join(__dirname, '../..');

/**
 * Path to public directory
 */
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public');

/**
 * Path to src directory
 */
export const SRC_PATH = path.join(ROOT_PATH, 'src');

/**
 * Path to storage directory
 */
export const STORAGE_PATH =
  ENV !== 'test'
    ? path.join(ROOT_PATH, 'storage')
    : path.join(ROOT_PATH, 'test/app/storage');

export const PUBLIC_STORAGE_PATH =
  ENV !== 'test'
    ? path.join(PUBLIC_PATH, 'storage')
    : path.join(ROOT_PATH, 'test/app/public/storage');

/**
 * Path to resources directory
 */
export const RESOURCES_PATH = path.join(SRC_PATH, 'resources');

export const VIEWS_PATH = path.join(RESOURCES_PATH, 'views');

/**
 * Path to cli directory
 */
export const CLI_PATH = path.join(SRC_PATH, 'cli');
