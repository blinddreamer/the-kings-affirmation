const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { setupRoles } = require('./roles');
const activityOptions = require('./activityOptions');

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

client.on('ready', () => {
  // Set initial random status
  setRandomActivity();

  // Update status every 6 hours
  setInterval(setRandomActivity, 6 * 60 * 60 * 1000);
});

function setRandomActivity() {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: 'online',
  });
}

// Call the setupRoles function and pass the client object as a parameter
setupRoles(client);

client.login(process.env.DISCORD_TOKEN)