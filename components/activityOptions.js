// activityOptions.js

const { ActivityType } = require("discord.js");

const activityOptions = [
  { name: "MANDO!", type: ActivityType.Watching },
  { name: "Once in a Six Side", type: ActivityType.Watching },
  { name: "NIGHTRIDE", type: ActivityType.Watching },
  { name: "Ahsoka", type: ActivityType.Watching },
  { name: "Star Trek: Strange New Worlds", type: ActivityType.Watching },
  { name: "BattleBit", type: ActivityType.Playing },
  { name: "Terraria", type: ActivityType.Playing },
  { name: "Cosculluela, O`Neill - Legendario", type: ActivityType.Listening },
  { name: "YASS - En La Isla ", type: ActivityType.Listening },
  { name: "Dimension - if You Want To - Remix", type: ActivityType.Listening },
];

function getRandomActivity() {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  return activityOptions[randomIndex];
}

module.exports = {
  activityOptions,
  getRandomActivity,
};
