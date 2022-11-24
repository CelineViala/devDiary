/**
  * Middleware that respond to a next method with an error as argument
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
    console.log(err.message);
  }

  // Si l'application n'est pas en développement on reste vague sur l'erreur serveur
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal Server Error';
  }
  message = err.message;
  if (res.get('Content-type')?.includes('html')) {
    res.status(statusCode).render('erreur', {
      statusCode,
      message,
      title: `Erreur ${err.statusCode}`,
    });
  } else {
    res.status(statusCode).json({
      status: 'erreur',
      statusCode,
      message,
    });
  }
};

module.exports = {
  errorHandler,
};
