const Games = require("../models/Games");
const Players = require("../models/Players");
const Standings = require("../models/Standings");
const Stats = require("../models/Stats");
const Teams = require("../models/Teams");
const Tournaments = require("../models/Tournaments");
const Users = require("../models/Users");

const syncDB = () => {
  try {

    // Games.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Games Model synced  --------- ");
    // });

    // Players.sync({ alter: true, }).then(() => {
    //   console.log("🚀🚀🚀 --------- Players Model synced --------- ");
    // });

    // Standings.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Standings Model synced --------- ");
    // });

    // Stats.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Stats Model synced --------- ");
    // });

    // Teams.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Teams Model synced --------- ");
    // });

    // Tournaments.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Tournaments Model synced --------- ");
    // });

    // Users.sync({ alter: true }).then(() => {
    //   console.log("🚀🚀🚀 --------- Users Model synced --------- ");
    // })

  } catch (error) {
    console.log(error)
  }
}

module.exports = { syncDB };
