const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { setupRoles } = require('./roles');
const { setRandomActivity } = require('./activityOptions');

const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
  ],
});

client.on('error', (error) => {
    console.error(error);
});

client.on('warn', (warning) => {
    console.warn(warning);
});

// Call the setupRoles function and pass the client object as a parameter
setupRoles(client);

client.on('ready', () => {
  // Set initial random status
  setRandomActivity(client);

  // Update status every 6 hours
  setInterval(() => {
    setRandomActivity(client);
  }, 6 * 60 * 60 * 1000);
});

client.login(process.env.DISCORD_TOKEN);