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
  tournament_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

Standings.belongsTo(Tournaments, {
  foreignKey: 'tournament_id',
  targetKey: 'id',
  as: 'tournament',
});
Standings.belongsTo(Teams, {
  foreignKey: 'team_id',
  targetKey: 'id',
  as: 'team',
});



module.exports = Standings;
