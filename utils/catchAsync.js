// Error handling for async function
exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
