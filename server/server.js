const { App } = require('@slack/bolt');
const db = require('./models/conversationModel');

require('dotenv').config();
// Initializes your app with your bot token and signing secret

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // alternative socket mode
  appToken: process.env.APP_TOKEN,
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

/**
 * Command to get all channel ids
 *
 * This is useful to get the reference ids that Slack uses to designate public channels
 *
 * This info can be used in conjunction with a number of other Slack APIs to get info such as messages in a particular channel
 */
app.message('channel ids', async ({ message, say }) => {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const channel of result.channels) {
      store.push(channel.id);
    }
    say('Conversation ID Retrieved!');
    // console.log(store)
  } catch (error) {
    console.error(error);
  }
});

/**
 * Command to get all conversations in every public channel
 *
 * channel ids above must be run so that store is populated with channel ids
 *
 * Can be reconfigured to not rely on another command
 *
 * all conversations will be stored in conversation before being stored in db
 */
app.message('all conversations', async ({ message, say }) => {
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

/**
 * Retrieves channel names
 *
 * Does not need store which contains channel ids
 *
 * Conversations command can be reconfigured the way channel names is set up
 *
 * Seperated channel ids and names for proof of concept and testing purposes
 */
app.message('channel names', async ({ message, say }) => {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    console.log(result.channels)
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

/**
 * Retrieves timestamp and converts into human readable format
 *
 * Uses conversation array since it contains all timestamp information and uses store to get channel id
 *
 * Useful to make SQL joins
 */
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

/**
 * User id retrieves Slack id, username and related information
 *
 * Refer to Slack API documentation for more retrievable fields
 */
app.message('user id', async ({ message, say }) => {
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
  console.log('app is running!');
})();
