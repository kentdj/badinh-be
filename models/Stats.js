const { DataTypes } = require("sequelize");
const { sq } = require('../db/connect');
const Players = require("./Players");
const Games = require("./Games");

const Stats = sq.define('Stats', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assists: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  offensiveRebounds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defensiveRebounds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  steals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blocks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  turnOvers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  personalFouls: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fieldGoalsMade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fieldGoalsAttemted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  threePointMade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  threePointAttemted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  freeThrowMade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  freeThrowAttemted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Stats.belongsTo(Games, {
  foreignKey: 'game_id',
  targetKey: 'id',
  as: 'game',
});
Stats.belongsTo(Players, {
  foreignKey: 'player_id',
  targetKey: 'id',
  as: 'player',
});

module.exports = Stats;
