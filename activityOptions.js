//activityOptions.js

const { ActivityType } = require('discord.js');

const activityOptions = [
  { name: 'SaltEMike Reacts', type: ActivityType.Watching },
  { name: 'reddit', type: ActivityType.Watching },
  { name: 'Once in a Six Side', type: ActivityType.Watching },
  { name: 'NIGHTRIDE', type: ActivityType.Watching },
  { name: 'Trigun Stampede', type: ActivityType.Watching },
  { name: 'BattleBots', type: ActivityType.Watching },
  { name: 'GTA5rp', type: ActivityType.Watching },
  { name: 'Cowboy Bebop', type: ActivityType.Listening },
  { name: 'Cosculluela, O`Neill - Legendario (feat. O`Neill)', type: ActivityType.Listening },
  { name: 'Music Factory - BLOOD STREETS TEARS(SPEEDY CORE) [Remix]', type: ActivityType.Listening },
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
};