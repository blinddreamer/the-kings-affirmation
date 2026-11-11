// app.js
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { setupRoles } = require("./components/roles");
const { getRandomActivity } = require("./components/activityOptions");
const { checkYouTubeChannels } = require("./components/tube");

const YOUTUBE_TARGET_CHANNEL_ID = "482315570201755664";
const HOUR = 60 * 60 * 1000;

const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on(Events.Error, (error) => console.error("Bot error:", error));
client.on(Events.Warn, (warning) => console.warn("Bot warning:", warning));

const roles = setupRoles(client);

function setRandomActivity() {
  const activity = getRandomActivity();
  client.user.setPresence({ activities: [activity], status: "online" });
  console.log(`Activity set to: ${activity.name}`);
}

client.once(Events.ClientReady, () => {
  console.log(`Bot is ready as ${client.user.tag}`);

  setRandomActivity();
  setInterval(setRandomActivity, 6 * HOUR);

  // Runs on startup too; already-posted videos are skipped via the DB.
  checkYouTubeChannels(client, YOUTUBE_TARGET_CHANNEL_ID);
  setInterval(
    () => checkYouTubeChannels(client, YOUTUBE_TARGET_CHANNEL_ID),
    24 * HOUR
  );
});

// Custom signal handlers replace Node's default exit, and the intervals
// above keep the event loop alive, so exit explicitly.
function shutdown() {
  roles.teardown();
  client.destroy().finally(() => process.exit(0));
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

client.login(process.env.DISCORD_TOKEN);
