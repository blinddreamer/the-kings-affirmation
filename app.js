// app.js
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./components/roles");
const { handleMessage } = require("./components/smart");
const { getRandomActivity } = require("./components/activityOptions");
const { checkYouTubeChannels } = require("./components/tube");

const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("error", (error) => {
  console.error("Bot error:", error);
});

client.on("warn", (warning) => {
  console.warn("Bot warning:", warning);
});

setupRoles(client);

client.on("ready", () => {
  const activity = getRandomActivity();
  client.user.setPresence({
    activities: [activity],
    status: "online",
  });

  console.log(`Bot is ready as ${client.user.tag}`);
  console.log(`Setting activity`);

  setupRoles(client);

  setInterval(() => {
    const newActivity = getRandomActivity(); // Update activity periodically
    client.user.setActivity(newActivity);
  }, 6 * 60 * 60 * 1000);

  // Specify the target channel ID
  const targetChannelId = "482315570201755664";

  // Call checkYouTubeChannels every 168h(1week) for the specified channel
  setInterval(() => {
    checkYouTubeChannels(client, targetChannelId);
  }, 168 * 60 * 60 * 1000);
});

client.on("messageCreate", (message) => {
  handleMessage(message, client); // Pass the client object to handleMessage
});

client.login(process.env.DISCORD_TOKEN);
