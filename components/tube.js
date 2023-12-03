// tube.js
const axios = require("axios");

const channelIds = [
  "UCOblfLLbNni0_VUeGWhiKDw", // Mike
  "UCbgREE7EbOfejxW3oQoX47w", // Mike reacts
  "UCO7jewStDoxh5siZcNSCkww", // DESINKO
  "UCiPdjrLoUsyJh3XS7Aw7rzg", // Morf
  "UCjG18qTsHaJDnpqWOXWXLSw", //runners
  "UCCFsPbWPqGWg2oUhPM27X6g", //tomato
  "UCPYlj5jmsH2_cmumBB6Jv1w", //tomato 2
  "UCTeLqJq1mXUX5WWoNXLmOIA", //SC offi
  "UCoMc7KVInwWQgbpo7PezIJQ", //voidi
];

const apiKey = process.env.YT_API;

async function getLatestVideoId(channelIdYoutube) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelIdYoutube}&type=video&order=date&maxResults=1&key=${apiKey}`
    );

    const latestVideoId = response.data.items[0]?.id.videoId;
    console.log("Latest Video ID:", latestVideoId);

    return latestVideoId;
  } catch (error) {
    console.error("Error in getLatestVideoId:", error.message);
    throw error;
  }
}

async function checkYouTubeChannels(client, targetChannelId) {
  const newVideos = [];

  for (const channelIdYoutube of channelIds) {
    try {
      const latestVideoId = await getLatestVideoId(channelIdYoutube);
      if (latestVideoId) {
        const targetChannel =
          typeof targetChannelId === "string"
            ? await client.channels.fetch(targetChannelId).catch((error) => {
                console.error("Error fetching channel:", error.message);
                return null;
              })
            : targetChannelId;

        if (targetChannel) {
          console.log(`Sending notification to channel ${targetChannel.name}`);
          targetChannel.send(
            `New video for ${channelIdYoutube}: https://www.youtube.com/watch?v=${latestVideoId}`
          );
        } else {
          console.error(
            "Channel not found. Make sure the provided channel ID is correct."
          );
        }
      }
    } catch (error) {
      console.error(`Error checking ${channelIdYoutube}:`, error.message);
    }
  }
}

module.exports = {
  getLatestVideoId,
  checkYouTubeChannels,
};
