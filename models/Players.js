const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect');
const Teams = require("./Teams");

const Players = sq.define('Players', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  avatar: {
    type: DataTypes.STRING,
    default: '/uploads/example.jpeg'
  },
  position: {
    type: DataTypes.ENUM("PG", "SG", "SF", "PF", "C"),
    allowNull: false,
    defaultValue: "SF",
  },
});

Players.associate = () => {
  Players.belongsTo(Teams, {
    foreignKey: 'team_id',
    allowNull: false
  });
};

// Players.sync({ force: true }).then(() => {
//   console.log(" --------- Players Model synced --------- ");
// });

module.exports = Players;
