const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect')
const bcryptjs = require('bcryptjs');

const User = sq.define("user", {
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
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },


  fullName: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
      return rawValue;
    }
  },
  nickName: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  role: {
    type: DataTypes.ENUM("admin", "member", "user"),
    defaultValue: "member",
  }
});

User.beforeCreate(async (User, options) => {
  return bcryptjs.hash(User.password, 10)
    .then(hash => {
      User.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
});

User.prototype.validPassword = async function (canditatePassword) {
  const isMatch = await bcryptjs.compare(canditatePassword, this.password);
  return isMatch;
}

// User.sync({ force: true }).then(() => {
//   console.log("User Model synced");
// });

module.exports = User;
