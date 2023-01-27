const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { ActivityType } = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");

const client = new Client({
    partials: [Partials.Message, Partials.Reaction],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
		//GatewayIntentBits.GuildMembers,
        //GatewayIntentBits.GuildModeration,
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

const activityOptions = [
    { name: 'Trigun Stampede', type: ActivityType.Watching },
    { name: 'BattleBots', type: ActivityType.Watching },
    { name: 'Cowboy Bebop', type: ActivityType.Listening },
];

client.on('ready', () => {
    console.log('setting status');
    const randomIndex = Math.floor(Math.random() * activityOptions.length);
    const activity = activityOptions[randomIndex];
    client.user.setPresence({
        activities: [activity],
        status: 'online',
    });
});

const config = [
    {
      messageId: "818172637393190933",  //plex
      roleId: "759091494215745557",
      reaction: "759103156285472818",
    },
    {
      messageId: "820675271949680710",  //sot
      roleId: "627688811966758922",
      reaction: "759103156218757162",
    },
    {
      messageId: "820677513205383168", //sc
      roleId: "759093067772067890",
      reaction: "759103161276432384",
    },
  ];

const manager = new ReactionRole(client, config); 

const destroy = () => {
    manager.teardown();
    client.destroy();
  };
  process.on("SIGINT", destroy);
  process.on("SIGTERM", destroy);
  

client.login(process.env.DISCORD_TOKEN);