//activityOptions.js

const { ActivityType } = require('discord.js');

const activityOptions = [
  { name: 'SaltEMike Reacts', type: ActivityType.Watching },
  { name: 'MANDO!', type: ActivityType.Watching },
  { name: 'Once in a Six Side', type: ActivityType.Watching },
  { name: 'NIGHTRIDE', type: ActivityType.Watching },
  { name: 'Trigun Stampede', type: ActivityType.Watching },
  { name: 'BattleBots', type: ActivityType.Watching },
  { name: 'BattleBit', type: ActivityType.Playing },
  { name: 'Cowboy Bebop OS', type: ActivityType.Listening },
  { name: 'Cosculluela, O`Neill - Legendario', type: ActivityType.Listening },
  { name: 'YASS - En La Isla ', type: ActivityType.Listening },
  { name: 'Dimension - if You Want To - Remix', type: ActivityType.Listening },
];

function setRandomActivity(client) {
  const randomIndex = Math.floor(Math.random() * activityOptions.length);
  const activity = activityOptions[randomIndex];
  client.user.setPresence({
    activities: [activity],
    status: 'online',
  });
}

module.exports = {
  setRandomActivity,
  activityOptions,
};