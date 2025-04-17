// roles.js

const { ReactionRole } = require("discordjs-reaction-role");

function setupRoles(client) {
  const config = [
    {
      messageId: "818172637393190933", //plex
      roleId: "759091494215745557",
      reaction: "759103156285472818",
    },
    {
      messageId: "820677513205383168", //sc
      roleId: "759093067772067890",
      reaction: "759103161276432384",
    },
  ];

  const manager = new ReactionRole(client, config);

  const destroy = () => {
    manager.teardown();
    client.destroy();
  };

  process.on("SIGINT", destroy);
  process.on("SIGTERM", destroy);
}

module.exports = { setupRoles };
