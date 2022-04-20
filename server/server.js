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

const store = [];
const conversation = [];
const textArr = [];

app.message('store conversation id', async ({ message, say }) => {
  try {
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const channel of result.channels) {
      store.push(channel.id);
    }
    console.log(store);
  } catch (error) {
    console.error(error);
  }
});

app.message('store conversation', async ({ message, say }) => {
  try {
    for (let i = 0; i < store.length; i += 1) {
      const result = await app.client.conversations.history({
        channel: store[i],
      });
      conversation.push(result.messages);

      for (let j = 0; j < conversation[i].length; j += 1) {
        textArr.push(conversation[i][j].text);
        const conversations =
          'INSERT INTO conversations (channel, user_name, text, ts) VALUES ($1, $2, $3, $4)';
        db.query(
          conversations,
          [
            store[i],
            conversation[i][j].user,
            conversation[i][j].text,
            conversation[i][j].ts,
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
    console.log(conversation);
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
      const channels =
        'INSERT INTO channel (channel_id, channel_name) VALUES ($1, $2)';
      db.query(channels, [channel.id, channel.name], (err, data) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.message('conversation timestamp', ({ message, say }) => {
  try {
    for (let i = 0; i < conversation.length; i += 1) {
      for (let j = 0; j < conversation[i].length; j += 1) {
        const date = new Date(Math.floor(conversation[i][j].ts * 1000));
        const ts =
          'INSERT INTO timestamp (timestamp_unix, timestamp_date) VALUES ($1, $2)';
        db.query(ts, [conversation[i][j].ts, date], (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  } catch {}
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
