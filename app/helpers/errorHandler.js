const debug = require('debug')('app:error');
/**
  * Middleware responding with an error as argument
  * @param {object} err Error class
  * @param {object} res Express response object
  */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _, res, next) => {
  let { message } = err;
  let statusCode = err.infos?.statusCode;

  if (!statusCode || Number.isNaN(Number(statusCode))) {
    statusCode = 500;
  }

  if (statusCode === 500 || statusCode === 400) {
    debug(err.message);
  }

  message = err.message;
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    status: 'erreur',
    statusCode,
    message,
  });
};

module.exports = {
  errorHandler,
};
