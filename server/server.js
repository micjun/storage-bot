const { App } = require('@slack/bolt');
const db = require('./models/conversationModel');

require('dotenv').config();
// Initializes your app with your bot token and signing secret

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // socketMode: true, // alternative socket mode
  // appToken: process.env.APP_TOKEN,
});

const channellist = {};
const userlist = {};
const store = [];
const conversation = [];
const textArr = [];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

app.message('store conversation id', async ({ message, say }) => {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const channel of result.channels) {
      store.push(channel.id);
    }
    say('Conversation ID Retrieved!');
  } catch (error) {
    console.error(error);
  }
});

app.message('store all conversation', async ({ message, say }) => {
  try {
    for (let i = 0; i < store.length; i += 1) {
      const result = await app.client.conversations.history({
        channel: store[i],
      });
      conversation.push(result.messages);

      for (let j = 0; j < conversation[i].length; j += 1) {
        textArr.push(conversation[i][j].text);
        const date = new Date(Math.floor(conversation[i][j].ts * 1000));
        const conversations =
          'INSERT INTO conversations (channel, user_name, text, ts, username, channelname, date) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        db.query(
          conversations,
          [
            store[i],
            conversation[i][j].user,
            conversation[i][j].text,
            conversation[i][j].ts,
            userlist[conversation[i][j].user],
            channellist[store[i]],
            date,
          ],
          (err, data) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    // say(JSON.stringify(textArr));
    say('All conversation data saved!');
  } catch (error) {
    console.error(error);
  }
});

app.message('channel names', async ({ message, say }) => {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const channel of result.channels) {
      channellist[channel.id] = channel.name;
      const channels =
        'INSERT INTO channel (channel_id, channel_name) VALUES ($1, $2)';
      db.query(channels, [channel.id, channel.name], (err, data) => {
        if (err) {
          console.log(err);
        }
      });
    }
    say('Channel names identified!');
  } catch (error) {
    console.error(error);
  }
});

app.message('conversation timestamp', ({ message, say }) => {
  try {
    for (let i = 0; i < conversation.length; i += 1) {
      for (let j = 0; j < conversation[i].length; j += 1) {
        const date = new Date(Math.floor(conversation[i][j].ts * 1000));
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const dates = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        const ts =
          'INSERT INTO timestamp (timestamp_unix, timestamp_date, channel_id, year, month, date, hour, min, sec, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        db.query(
          ts,
          [
            conversation[i][j].ts,
            date,
            store[i],
            year,
            month,
            dates,
            hour,
            min,
            sec,
            conversation[i][j].user,
          ],
          (err, data) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    say('Timestamp converted into date/time!');
  } catch (error) {
    console.error(error);
  }
});

app.message('store user id', async ({ message, say }) => {
  try {
    const result = await app.client.users.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const user of result.members) {
      userlist[user.id] = user.name;
      const userID =
        'INSERT INTO userid (user_id, user_name, real_name, team_id, tz, tz_label) VALUES ($1, $2, $3, $4, $5, $6)';
      db.query(
        userID,
        [
          user.id,
          user.name,
          user.real_name,
          user.team_id,
          user.tz,
          user.tz_label,
        ],
        (err, data) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    say('All user info stored!');
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
