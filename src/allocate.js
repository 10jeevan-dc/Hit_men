const dbStore = require('../services/dbStore');
const {
  GAME_TIME_IN_SECS, DEFAULT_TEAM, TEAMS, OPONENT_TEAM
} = require('../constants/common');
const cuid = require('cuid');

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

const createNewSession = async () => {
  const sessionName = cuid();
  try {
    const result = await dbStore.connectionPool.execute('INSERT INTO `sessions` (`session_id`, `session_time`) VALUES (?, ?)', [sessionName, GAME_TIME_IN_SECS]);
    if (!result.length) throw result;
    return sessionName;
  } catch (error) {
    throw error;
  }
};

const allocateUserToTeam = async ({
  userName, sessionName, team, creator
}) => {
  try {
    const result = await dbStore.connectionPool.execute(
      'INSERT INTO users (username, session_id,  team, creator) VALUES (?, ?, ?, ?)',
      [userName, sessionName, team, creator]
    );
    if (!result.length) throw result;
    return sessionName;
  } catch (error) {
    throw error;
  }
};

const updateSessionsWithTeam = async ({ sessionName, team }) => {
  try {
    const result = await dbStore.connectionPool.execute(`UPDATE sessions SET team_${team} = team_${team} + 1`);
    if (!result.length) throw result;
    return sessionName;
  } catch (error) {
    throw error;
  }
};

const getTeam = session => (session.team_A > session.team_B ? TEAMS.B : TEAMS.A);

const allocate = async (userName) => {
  try {
    const session = await returnExistingSession();
    if (session.length && session[0].active) {
      // game session exists
      const selfTeam = getTeam(session[0]);
      const sessionName = session[0].session_id;
      await allocateUserToTeam({
        userName, sessionName, team: selfTeam, creator: false
      });
      await updateSessionsWithTeam({ sessionName, team: selfTeam });
      return {
        sessionName,
        userName,
        selfTeam,
        opponentTeam: OPONENT_TEAM[selfTeam],
        gamePlayTimeInSeconds: GAME_TIME_IN_SECS
      };
    }
    // else create new session
    const sessionName = await createNewSession();
    await allocateUserToTeam({
      userName, sessionName, team: DEFAULT_TEAM, creator: true
    });
    await updateSessionsWithTeam({ sessionName, team: DEFAULT_TEAM });
    return {
      sessionName,
      userName,
      selfTeam: DEFAULT_TEAM,
      opponentTeam: OPONENT_TEAM[DEFAULT_TEAM],
      gamePlayTimeInSeconds: GAME_TIME_IN_SECS
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  allocate
};
