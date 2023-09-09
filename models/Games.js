const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect');
const Tournaments = require("./Tournaments");
const Teams = require("./Teams");

const Games = sq.define('Games', {
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
  home_team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  home_team_score: {
    type: DataTypes.INTEGER,
  },
  away_team_score: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Games.belongsTo(Tournaments, {
  foreignKey: 'tournament_id',
  targetKey: 'id',
  as: 'tournament',
});
Games.belongsTo(Teams, {
  foreignKey: 'home_team_id',
  targetKey: 'id',
  as: 'homeTeam',
});
Games.belongsTo(Teams, {
  foreignKey: 'away_team_id',
  targetKey: 'id',
  as: 'awayTeam',
});

module.exports = Games;
