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

<details>
  <summary>Click to expand</summary>

### YAML code

```js
display_information:
name: storage-bot
features:
bot_user:
  display_name: storage-bot
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
