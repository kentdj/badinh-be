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

Stats.associate = () => {
  Stats.belongsTo(Games, {
    foreignKey: 'game_id'
  });
  Stats.belongsTo(Players, {
    foreignKey: 'player_id'
  });
};

// Stats.sync({ force: true }).then(() => {
//   console.log(" --------- Stats Model synced --------- ");
// });

module.exports = Stats;
