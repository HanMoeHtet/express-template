/**
 * Async middleware builder. Since express can't handle rejected promises implicitly,
 * use this to handle async errors. Now you can throw exceptions
 * without calling `next(new Exception())`. Usage: `asyncHandler(fn)`.
 */
export const asyncHandler = (handler) => (req, res, next) => {
  return Promise.resolve(handler(req, res, next)).catch(next);
};
