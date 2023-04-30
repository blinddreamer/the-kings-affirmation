const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { setupRoles } = require('./roles');
const setupReady = require('./activityOptions');


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

// Call the exported function from the acivityOptions.js file
setupReady(client);

client.login(process.env.DISCORD_TOKEN)