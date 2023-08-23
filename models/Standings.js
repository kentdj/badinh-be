const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect');
const Tournaments = require("./Tournaments");
const Teams = require("./Teams");

const Standings = sq.define('Standings', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  matches_played: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  matches_won: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  matches_lost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points_for: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points_against: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Standings.associate = () => {
  Standings.belongsTo(Tournaments, {
    foreignKey: 'tournament_id'
  });
  Standings.belongsTo(Teams, {
    foreignKey: 'team_id'
  });
};


// Standings.sync({ force: true }).then(() => {
//   console.log(" --------- Standings Model synced --------- ");
// });

module.exports = Standings;
