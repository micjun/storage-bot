const db = require('./models/conversationModel');

const createChannel = `CREATE TABLE IF NOT EXISTS channel (
  id SERIAL PRIMARY KEY,
  channel_id VARCHAR NOT NULL,
  channel_name VARCHAR NOT NULL
)`;
const createUserId = `CREATE TABLE IF NOT EXISTS userid (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  user_name VARCHAR NOT NULL,
  real_name VARCHAR NOT NULL,
  team_id VARCHAR NOT NULL,
  tz VARCHAR NOT NULL,
  tz_label VARCHAR NOT NULL
)`;
const createConversation = `CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  channel VARCHAR NOT NULL,        
  user_name VARCHAR NOT NULL,
  text VARCHAR NOT NULL,   
  ts VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  channelname VARCHAR NOT NULL,
  date VARCHAR NOT NULL
)`;
const createTimestamp = `CREATE TABLE IF NOT EXISTS timestamp (
  id SERIAL PRIMARY KEY,
  timestamp_unix VARCHAR NOT NULL,
  timestamp_date VARCHAR NOT NULL,
  channel_id VARCHAR NOT NULL,
  year INTEGER NOT NULL, 
  month VARCHAR NOT NULL, 
  date INTEGER NOT NULL, 
  hour INTEGER NOT NULL, 
  min INTEGER NOT NULL,
  sec INTEGER NOT NULL, 
  user_id VARCHAR NOT NULL
)`;

const create = () => {
  db.query(createChannel, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(createUserId, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(createConversation, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  db.query(createTimestamp, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.create = create;
