const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { ActivityType } = require('discord.js');
const { setupRoles } = require('./roles');

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

//client.on('ready', () => {
//    const channel = client.channels.cache.get('490478387991805973');
//    channel.send('back online');
//});


//roles
const activityOptions = [
    { name: 'Trigun Stampede', type: ActivityType.Watching },
    { name: 'BattleBots', type: ActivityType.Watching },
    { name: 'Cowboy Bebop', type: ActivityType.Listening },
];

client.on('ready', () => {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: 'online',
  });

  // Call the setupRoles function and pass the client object as a parameter
  setupRoles(client);
});

client.login(process.env.DISCORD_TOKEN);