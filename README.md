Table of Contents

- [About](#about)
- [Installation](#installation)
    - [YAML code](#yaml-code)
- [How to use](#how-to-use)
  - [Channel ID](#channel-id)
  - [Channel Name](#channel-name)
  - [User ID](#user-id)
  - [Conversations](#conversations)
  - [Timestamps](#timestamps)

# About

This is an easy to use Slack App for downloading all messages in public channels of your Slack workspaces. This Slack App or Storage Bot as I like to call it, will store all messages in all public channels along with pertinent information such as timestamps and message sender. We accomplish this by utilizing Slack's SDK Bolt to extract conversation information and store them accordingly to a database of choice. You **will need** Admin access to add the Slack App to the Slack workspace.

# Installation

1. Clone this repo and run `npm i`
2. Create [Slack App](https://api.slack.com/apps?new_app=1)
3. Select "From an app manifest"
4. Pick the workspace you want to use storage -bot
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

6. Create App
7. In "Basic Information", scroll down to "App-Level Tokens" and generate a token with scope "connections: write" and "authorization:read". You can name the token whatever you like - for example, test
8. Create a .env file at root and set APP_TOKEN = App Level Token (this token starts with xapp)
9. In the same .env file set SLACK_BOT_TOKEN = placeholder (this token starts with xoxb) and SLACK_SIGNING_SECRET = placeholder
10. In the .env file set your URI = to the URI of whichever postgres you are using
    <details>
      <summary>Expand for PostgreSQL setup example using ElephantSQL</summary>  
        
    </details>
11. Invite Storage bot to the channels that you want the conversation histories of by using the slash command /invite to invite Storage bot

# How to use

After you have setup the bot on Slack App, installed the Slack App into the workspace and setup the database, you can now run your bot. You will do this by messaging the bot (in this case storage bot) your commands. You will need to enter the following commands in order.

## Channel ID

    channel ids

- retrieves unique id of every public channel in Slack workspace and stores them in an array

## Channel Name

    channel names

- stores channel name, id and relevant information in channel table

## User ID

    user id

- stores user id information such as alias and timezone in userid table

## Conversations

    all conversations

- stores all conversations in every channel that the bot is in and other information such as username, channel name and date in conversation table

## Timestamps

    conversation timestamp

- stores timestamp information for each conversation such as day, month, year, minute, sec, hour in timestamp table
