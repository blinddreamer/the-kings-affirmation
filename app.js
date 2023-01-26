const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === '👍') {
        reaction.message.guild.members.fetch(user).then(member => {
            let role = reaction.message.guild.roles.cache.find(r => r.name === "Approved");
            member.roles.add(role);
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
