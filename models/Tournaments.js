const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect')

const Tournaments = sq.define('Tournaments', {
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
  description: {
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
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Tournaments.sync({ force: true }).then(() => {
//   console.log(" --------- Tournaments Model synced --------- ");
// });

module.exports = Tournaments;