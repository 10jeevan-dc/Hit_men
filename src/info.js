const dbStore = require('../services/dbStore');

const returnExistingSession = async () => {
  try {
    const result = await dbStore.connectionPool.query(`SELECT session_id, created_ts, active, team_A, team_B
      FROM sessions WHERE created_ts =
      (SELECT MAX(created_ts) FROM sessions)`);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getNumberOfPlayers = async (userName) => {
  try {
    const session = await returnExistingSession();
    if (session.length && session[0].active) {
      // game session exists
      return {
          playerCount: session[0].team_A + session[0].team_B
      };
    }
    // else return 0
    return {
      playerCount: 0
    };
  } catch (error) {
    throw error;
  }
};
  
module.exports = {
  getNumberOfPlayers
};
  