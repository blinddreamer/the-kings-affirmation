// app.js
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./components/roles");
const { handleMessage } = require("./components/smart");
const { getRandomActivity } = require("./components/activityOptions");
const { checkYouTubeChannels } = require("./components/tube");

// Create a new instance of the Discord client
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

// Event handling for errors and warnings
client.on("error", (error) => {
  console.error("Bot error:", error);
});

client.on("warn", (warning) => {
  console.warn("Bot warning:", warning);
});

// Function to set up roles
setupRoles(client);

// Event handling when the bot is ready
client.on("ready", () => {
  // Set a random activity when the bot starts
  const activity = getRandomActivity();
  client.user.setPresence({
    activities: [activity],
    status: "online",
  });

  console.log(`Bot is ready as ${client.user.tag}`);
  console.log(`Setting initial activity`);

  // Update activity every 6 hours
  setInterval(() => {
    const newActivity = getRandomActivity();
    client.user.setActivity(newActivity);
    console.log(`Updated activity to: ${newActivity.name}`);
  }, 6 * 60 * 60 * 1000);

  // Specify the target channel ID
  const targetChannelId = "482315570201755664";

  //tube
  // Schedule the checkYouTubeChannels function to run every 24 hours
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  // Initial run
  setTimeout(() => {
    checkYouTubeChannels(client, targetChannelId);

    // Schedule the next run every 24 hours
    setInterval(() => {
      checkYouTubeChannels(client, targetChannelId);
    }, oneDayInMilliseconds);
  }, oneDayInMilliseconds - (Date.now() % oneDayInMilliseconds));
});
//tube

// Event handling for incoming messages
client.on("messageCreate", (message) => {
  handleMessage(message, client);
});

// Log in to Discord using the provided token
client.login(process.env.DISCORD_TOKEN);
