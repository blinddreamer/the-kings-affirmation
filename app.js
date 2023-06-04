//app.js

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

setupRoles(client); // Call the setupRoles function and pass the client object as a parameter

client.on('ready', () => {
<<<<<<< HEAD
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: 'online',
  });

  // Call the setupRoles function and pass the client object as a parameter
  setupRoles(client);

=======
  
  setRandomActivity(client); // Set initial random status
  setInterval(() => { // Update status every 6 hours
    setRandomActivity(client);
  }, 6 * 60 * 60 * 1000);
>>>>>>> 73eec89045151a9b988abacc3bf2b53be403f4c1
});

client.login(process.env.DISCORD_TOKEN);