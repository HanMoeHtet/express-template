import path from 'path';

/**
 * Path to project root
 */
export const rootPath = path.join(__dirname, '../..');

/**
 * Path to public directory
 */
export const publicPath = path.join(rootPath, 'public');

/**
 * Path to src directory
 */
export const srcPath = path.join(rootPath, 'src');

/**
 * Path to storage directory
 */
export const storagePath = path.join(rootPath, 'storage');
