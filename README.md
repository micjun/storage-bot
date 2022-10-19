Table of Contents

- [Installation](#installation)
    - [YAML code](#yaml-code)
  - [Slack App Setup](#slack-app-setup)
  - [Database Setup](#database-setup)
  - [Run Bot](#run-bot)
- [How to use](#how-to-use)
- [Bot Commands](#bot-commands)
  - [Channel Names](#channel-names)

# Installation

1. Clone this repo and run `npm i`
2. Create [Slack App](https://api.slack.com/apps?new_app=1)
3. Select "From an app manifest"
4. Pick the workspace you want to use store-bot
5. Paste YAML code
<details>
  <summary>Click to expand</summary>

### YAML code

```js
display_information:
  name: storage
features:
  bot_user:
    display_name: storage
    always_online: false
oauth_config:
  scopes:
    bot:
      - app_mentions:read
      - channels:history
      - channels:read
      - chat:write
      - commands
      - im:history
      - im:read
      - im:write
      - users:read
settings:
  event_subscriptions:
    bot_events:
      - message.im
  interactivity:
    is_enabled: true
  org_deploy_enabled: false
  socket_mode_enabled: true
  token_rotation_enabled: false

```

</details>

5. Create App
6. In "Basic Information", scroll down to "App-Level Tokens" and generate a token with scope "connections: write" and "authorization:read". You can name the token whatever you like - for example, test
7. Create a .env file at root and set APP_TOKEN = App Level Token (this token starts with xapp)

## Slack App Setup

## Database Setup

## Run Bot

# How to use

# Bot Commands

## Channel Names

    bot to store all Slack messages in workspace

    Run in following order in slack workspace

    channel ids

    channel names

    user id

    all conversations

    conversation timestamp
