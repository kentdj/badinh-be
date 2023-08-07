const createTokenUser = (user) => {
  return { fullName: user.fullName, id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName, nickName: user.nickName };
};

module.exports = createTokenUser;
