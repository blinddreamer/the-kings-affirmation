//app.js
require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./roles");
const { setRandomActivity, activityOptions } = require("./activityOptions");

const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("error", (error) => {
  console.error(error);
});

client.on("warn", (warning) => {
  console.warn(warning);
});

setupRoles(client); // Call the setupRoles function and pass the client object as a parameter

client.on("ready", () => {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: "online",
  });

  // Call the setupRoles function and pass the client object as a parameter
  setupRoles(client);

  setRandomActivity(client); // Set initial random status
  setInterval(() => {
    // Update status every 6 hours
    setRandomActivity(client);
  }, 6 * 60 * 60 * 1000);
});

//smart sashe
const { answerQuestion } = require("./smart.js");

client.on("message", async (message) => {
  if (message.author.bot) return;

  // Check if the bot was mentioned
  if (message.mentions.has(client.user)) {
    const query = message.content.split(" ").slice(1).join(" ").trim();

    const answer = await answerQuestion(query);
    message.channel.send(answer);
  }
});

client.login(process.env.DISCORD_TOKEN);
