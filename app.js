const { Client, GatewayIntentBits } = require('discord.js');
const { ActivityType } = require('discord.js')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
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
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.id === '818172637393190933') {
        reaction.message.guild.members.fetch(user).then(member => {
            let role = reaction.message.guild.roles.cache.find(r => r.name === "plex");
            member.roles.add(role);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
