# The King's Affirmation Discord Bot

## Overview

The King's Affirmation is a Discord bot created using Node.js and the Discord.js library. It provides reaction-based role assignment, rotating activity status, and daily new-video notifications for a set of YouTube channels.

## Environment

- `DISCORD_TOKEN`: bot token
- `YT_API`: YouTube Data API key
- `sql_host`, `sql_user`, `sql_password`: MySQL connection (database `discord_bot_db`, table `posted_videos(video_id)`)
