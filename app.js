require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./roles");
const { setRandomActivity, activityOptions } = require("./activityOptions");
const { answerQuestion } = require("./smart");

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

setupRoles(client);

client.on("ready", () => {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: "online",
  });

  setupRoles(client);

  setRandomActivity(client);
  setInterval(() => {
    setRandomActivity(client);
  }, 6 * 60 * 60 * 1000);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    const question = message.content
      .replace(`<@!${client.user.id}>`, "")
      .trim();

    if (question) {
      try {
        const answer = await answerQuestion(question);
        message.reply(answer);
      } catch (error) {
        message.reply("ERROR.");
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
