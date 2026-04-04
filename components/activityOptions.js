// activityOptions.js

const { ActivityType } = require("discord.js");

const activityOptions = [
  { name: "Sakamoto Days", type: ActivityType.Watching },
  { name: "Adolescence", type: ActivityType.Watching },
  { name: "Severance", type: ActivityType.Watching },
  { name: "The Last of Us", type: ActivityType.Watching },
  { name: "Andor", type: ActivityType.Watching },
  { name: "Star Trek: Strange New Worlds", type: ActivityType.Watching },
  { name: "The Legend of Vox Machina", type: ActivityType.Watching },
  { name: "White Lotus", type: ActivityType.Watching },
  { name: "EVE Online", type: ActivityType.Playing },
  { name: "Monster Hunter Wilds", type: ActivityType.Playing },
  { name: "Doom: The Dark Ages", type: ActivityType.Playing },
  { name: "Sleep Token - Emergence", type: ActivityType.Listening },
  { name: "Kendrick Lamar - GNX", type: ActivityType.Listening },
  { name: "Charli XCX - Brat", type: ActivityType.Listening },
  {
    name: "Kings Of The Rollers - Somebody Else (feat. Lydia Plain)",
    type: ActivityType.Listening,
  },
];

function getRandomActivity() {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  return activityOptions[randomIndex];
}

module.exports = {
  activityOptions,
  getRandomActivity,
};
