const create = () => {
  const createChannel = `CREATE TABLE IF NOT EXISTS channel (
    channel_id VARCHAR,
    channel_name TEXT
  )`;
  const createUserId = `CREATE TABLE IF NOT EXISTS userid (
    user_id VARCHAR,
    user_name ,
    real_name ,
    team_id ,
    tz ,
    tz_label 
  )`;
  const createConversation = `CREATE TABLE IF NOT EXISTS conversations (
    channel VARCHAR,
    user_name VARCHAR,
    text ,
    ts ,
    username ,
    channelname ,
    date
  )`;
  const createTimestamp = `CREATE TABLE IF NOT EXISTS timestamp (
    timestamp_unix VARCHAR,
    timestamp_date ,
    channel_id ,
    ts ,
    year , 
    month , 
    date , 
    hour , 
    min ,
    sec , 
    user_id
  )`;
  db.query(createChannel, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.create = create;
