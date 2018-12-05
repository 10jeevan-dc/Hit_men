const dbStore = require('../services/dbStore');
const { TEAMS } = require('../constants/common');

const getTeamResults = (individualUsersdata) => {
  const score = {
    [TEAMS.A]: {
      score: 0,
      members: []
    },
    [TEAMS.B]: {
      score: 0,
      members: []
    }
  };
  let isGameFinished = true;
  individualUsersdata.forEach((userData) => {
    score[userData.team].members.push(userData);
    score[userData.team].score += userData.score;
    if (!userData.done) {
      isGameFinished = false;
    }
  });
  if (!isGameFinished) return { isGameActive: true, message: 'Everyone not done!', ...score };
  return score;
};

const getSessionScore = async (userName) => {
  try {
    const result = await dbStore.connectionPool.execute(
      'SELECT session_id, team, score FROM users WHERE username = ?',
      [userName]
    );
    if (!result.length) throw result;
    const sessionId = result[0][0].session_id;
    const selfTeam = result[0][0].team;
    const selfScore = result[0][0].score;
    const scoreResults = await dbStore.connectionPool.execute(
      'SELECT score, username, done, team FROM users WHERE session_id = ?',
      [sessionId]
    );

    const teamResults = getTeamResults(scoreResults[0]);
    return {
      score: teamResults,
      selfTeam,
      selfScore
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSessionScore
};
