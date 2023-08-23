const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect')
const bcryptjs = require('bcryptjs');

const Users = sq.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      len: [10, 15],
    }
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  nickName: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  avatar: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  dob: {
    type: DataTypes.DATE,
    validate: {
      isDate: true
    }
  },
  role: {
    type: DataTypes.ENUM("admin", "member", "user"),
    defaultValue: "member",
  }
});

Users.beforeCreate(async (Users, options) => {
  // set fullname
  Users.setDataValue('fullName', Users.firstName + ' ' + Users.lastName)

  // encrypt password
  return bcryptjs.hash(Users.password, 10)
    .then(hash => {
      Users.password = hash;
    })
    .catch(err => {
      throw new Error(err);
    });
});

Users.beforeUpdate(async (Users, options) => {
  // encrypt password
  return bcryptjs.hash(Users.password, 10)
    .then(hash => {
      Users.password = hash;
    })
    .catch(err => {
      throw new Error(err);
    });
});

Users.prototype.validPassword = async function (canditatePassword) {
  const isMatch = bcryptjs.compare(canditatePassword, this.password);
  return isMatch;
}

// Users.sync({ force: true }).then(() => {
//   console.log(" --------- Users Model synced --------- ");
// })

module.exports = Users;