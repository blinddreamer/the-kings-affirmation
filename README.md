# The King's Affirmation Discord Bot

## Overview

The King's Affirmation is a Discord bot created using Node.js and the Discord.js library. This bot provides various functionalities, including reaction-based role assignment, intelligent chat responses, and dynamic activity updates.

## Features

- **Reaction Role Assignment:** Users can assign themselves roles by reacting to specific messages with designated reactions.

- **Intelligent Chat Responses:** The bot utilizes the power of OpenAI's GPT-3.5 Turbo model to provide intelligent responses to user messages.

- **Dynamic Activity Updates:** The bot's activity status is continuously updated with various options, including watching different shows and listening to music.

## Usage

1. Clone this repository to your local machine.
2. Install the required Node.js packages by running `npm install`.
3. Configure the bot by setting environment variables:

   - `DISCORD_TOKEN`: Your Discord bot token.
   - `OPENAI_API_KEY`: Your OpenAI API key.

4. Run the bot using `node app.js`.

### Docker Container

You can also run the bot using Docker:

1. **Pull the Docker Image** from the GitHub Container Registry (GHCR):

   ```bash
   docker pull ghcr.io/your-username/the-kings-affirmation:latest
   ```

2. **Create a Docker Container** with your environment variables set:

   ```bash
   docker run -d \
     -e DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN \
     -e OPENAI_API_KEY=YOUR_OPENAI_API_KEY \
     ghcr.io/blinddreamer/the-kings-affirmation:latest
   ```

   Replace `YOUR_DISCORD_BOT_TOKEN` and `YOUR_OPENAI_API_KEY` with your actual Discord bot token and OpenAI API key.

This will start the bot in a Docker container with the specified configuration.

## Bot Commands

- The bot automatically responds to messages with intelligent answers.
- Users can assign themselves roles by reacting to specific messages.
- The bot's activity is updated periodically with various options.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Discord.js](https://discord.js.org/)
- [OpenAI](https://openai.com/)
- [discordjs-reaction-role](https://www.npmjs.com/package/discordjs-reaction-role)
