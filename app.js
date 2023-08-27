require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./components/roles");
const {
  setRandomActivity,
  activityOptions,
} = require("./components/activityOptions");
const { answerQuestion } = require("./components/smart");

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
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: "online",
  });

  console.log(`Bot is ready as ${client.user.tag}`);
  console.log(`Setting activity`);

  setupRoles(client);

  setRandomActivity(client);
  setInterval(() => {
    setRandomActivity(client);
  }, 6 * 60 * 60 * 1000);
});

client.on("messageCreate", async (message) => {
  console.log("Message received:", message.content);
  if (message.author.bot) return;

  // Check if the message mentions the bot
  if (message.mentions.has(client.user)) {
    // Remove the mention and trim the message content
    const messageContent = message.content
      .replace(`<@!${client.user.id}>`, "")
      .trim();

    // Check if the message content starts with a command
    if (messageContent.startsWith("/sasheto")) {
      // Remove the command prefix and trim the command
      const command = messageContent.slice("/sasheto".length).trim();

      if (command) {
        try {
          const answer = await answerQuestion(command);
          message.reply(answer);
          console.log(
            `Replied to message by ${message.author.tag}: "${command}"`
          );
        } catch (error) {
          console.error("Error fetching answer:", error);
          message.reply("An error occurred while fetching the answer.");
        }
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
