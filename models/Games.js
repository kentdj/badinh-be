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

Games.associate = () => {
  Games.belongsTo(Tournaments, {
    foreignKey: 'tournament_id',
    allowNull: false
  });
  Games.belongsTo(Teams, {
    as: 'homeTeam',
    foreignKey: 'home_team_id',
    allowNull: false
  });
  Games.belongsTo(Teams, {
    as: 'awayTeam',
    foreignKey: 'away_team_id',
    allowNull: false
  });
};


// Games.sync({ force: true }).then(() => {
//   console.log(" --------- Games Model synced  --------- ");
// });

module.exports = Games;
