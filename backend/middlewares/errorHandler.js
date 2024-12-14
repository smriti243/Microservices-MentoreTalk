// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: err.message
  });
};

module.exports = errorHandler;
