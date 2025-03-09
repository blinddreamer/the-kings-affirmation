// activityOptions.js

const { ActivityType } = require("discord.js");

const activityOptions = [
  { name: "MANDO!", type: ActivityType.Watching },
  { name: "Dune: Part Two", type: ActivityType.Watching },
  { name: "Daredevil: Born Again", type: ActivityType.Watching },
  { name: "Ahsoka", type: ActivityType.Watching },
  { name: "Star Trek: Strange New Worlds", type: ActivityType.Watching },
  { name: "The Legend of Vox Machina", type: ActivityType.Watching },
  { name: "The Day of the Jackal", type: ActivityType.Watching },
  { name: "Cosculluela, O`Neill - Legendario", type: ActivityType.Listening },
  { name: "EVE Online", type: ActivityType.Playing },
  {
    name: "Kings Of The Rollers - Somebody Else (feat. Lydia Plain)",
    type: ActivityType.Listening,
  },
  {
    name: "Hanumankind, Kalmi - Hanumankind – Big Dawgs",
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
