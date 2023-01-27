const { Client, GatewayIntentBits } = require('discord.js');
const { ActivityType } = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration,
	],
});

client.on('error', (error) => {
    console.error(error);
});

client.on('warn', (warning) => {
    console.warn(warning);
});

client.on('ready', () => {
    console.log('setting status');
    client.user.setPresence({
        activities: [{ name: `Trigun Stampede`, type: ActivityType.Watching }],
        status: 'online',
      })
});

client.on('ready', () => {
    const channel = client.channels.cache.get('490478387991805973');
    channel.send('back to serve...');
    console.log('setting status');

    const rr = new ReactionRole(client, [
        { messageId: "818172637393190933", reaction: "759103156285472818", roleId: "759091494215745557" },
        { messageId: "1068510749594493069", reaction: ":759103156285472818", roleId: "759091494215745557" }, 
      ]);
});

// reactionRole.remove('818172637393190933', ':au16:', 'plex'); 

client.login(process.env.DISCORD_TOKEN);