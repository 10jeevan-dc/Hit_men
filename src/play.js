const dbStore = require('../services/dbStore');
const { DATE_TIME_FORMAT, GAME_TIME_IN_SECS } = require('../constants/common');
const moment = require('moment');

const start = async (userName) => {
  try {
    const result = await dbStore.connectionPool.execute(
      'UPDATE users SET start_time = ? WHERE username = ?',
      [moment().format(DATE_TIME_FORMAT), userName]
    );
    if (!result.length) throw result;
    return {
      canStart: true,
      userName
    };
  } catch (error) {
    throw error;
  }
};

const stop = async (userName) => {
  try {
    const result = await dbStore.connectionPool.execute(
      'UPDATE users SET done = ? WHERE username = ?',
      [true, userName]
    );
    if (!result.length) throw result;
    // now query to check if this user was the game initiator. i.e creator == true
    const data = await dbStore.connectionPool.execute(
      'SELECT creator, session_id FROM users WHERE username = ?',
      [userName]
    );
    const isCreator = data[0][0].creator;
    const sessionId = data[0][0].session_id;
    if (isCreator) {
      await dbStore.connectionPool.execute(
        'UPDATE sessions SET active = ? WHERE session_id = ?',
        [false, sessionId]
      );
    }
    return {
      gameOver: true,
      userName
    };
  } catch (error) {
    throw error;
  }
};

const userSessionDone = startTime => moment(startTime).add(GAME_TIME_IN_SECS, 'seconds') < moment();

const hit = async (userName) => {
  try {
    // get old score and session start-time
    const scoreResults = await dbStore.connectionPool.query(
      'SELECT score, start_time FROM users WHERE username = ?',
      [userName]
    );
    const { score, start_time } = scoreResults[0][0]; // eslint-disable-line
    if (userSessionDone(start_time)) {
      // terminate session
      return await stop(userName);
    }
    // if all good update increment score
    const result = await dbStore.connectionPool.execute(
      'UPDATE users SET score = score + 1 WHERE username = ?',
      [userName]
    );
    if (!result.length) throw result;
    return {
      score: score + 1,
      userName
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  start,
  stop,
  hit
};
