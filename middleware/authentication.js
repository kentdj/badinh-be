const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  console.log('🚀 ~ file: authentication.js:6 ~ authenticateUser ~ token:', token)


  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { id, firstName, role, lastName, nickName, } = isTokenValid({ token });
    req.user = { id, firstName, role, lastName, nickName };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
