const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('🚀 ~ file: error-handle.js:17 ~ errorHandlerMiddleware ~ err:', err)

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // if (err.name === 'ReferenceError') {
  //   customError.msg = `No item found with id : ${req.params.id}`;
  //   customError.statusCode = 404;
  // }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
