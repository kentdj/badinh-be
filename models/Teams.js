const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect')

const Teams = sq.define('Teams', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  logo: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  coach: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  established_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Teams.sync({ force: true }).then(() => {
//   console.log(" --------- Teams Model synced --------- ");
// });

module.exports = Teams;
