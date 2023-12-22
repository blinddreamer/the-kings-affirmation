// tube.js
const axios = require("axios");
const mysql = require("mysql2/promise");

const channelIds = [
  "UCOblfLLbNni0_VUeGWhiKDw", // Mike
  "UCbgREE7EbOfejxW3oQoX47w", // Mike reacts
  "UCO7jewStDoxh5siZcNSCkww", // DESINKO
  "UCiPdjrLoUsyJh3XS7Aw7rzg", // Morf
  "UCjG18qTsHaJDnpqWOXWXLSw", // runners
  "UCCFsPbWPqGWg2oUhPM27X6g", // tomato
  "UCPYlj5jmsH2_cmumBB6Jv1w", // tomato 2
  "UCTeLqJq1mXUX5WWoNXLmOIA", // SC offi
  "UCoMc7KVInwWQgbpo7PezIJQ", // voidi
  "UC0z2Y04PZNbXNA9tjVMI0kA", // answerthecall
];

const apiKey = process.env.YT_API;

// MySQL database connection configuration
const dbConfig = {
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: "discord_bot_db",
};

let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

async function loadPostedVideoIds() {
  try {
    await connectToDatabase();
    const [rows] = await connection.query("SELECT video_id FROM posted_videos");
    return rows.map((row) => row.video_id);
  } catch (error) {
    console.error("Error loading posted video IDs:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

async function savePostedVideoId(videoId) {
  try {
    await connectToDatabase();
    await connection.query("INSERT INTO posted_videos (video_id) VALUES (?)", [
      videoId,
    ]);
  } catch (error) {
    console.error("Error saving posted video ID:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

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
  try {
    // Load posted video IDs from the database
    const postedVideoIds = await loadPostedVideoIds();

    for (const channelIdYoutube of channelIds) {
      try {
        const latestVideoId = await getLatestVideoId(channelIdYoutube);
        if (latestVideoId && !postedVideoIds.includes(latestVideoId)) {
          const targetChannel =
            typeof targetChannelId === "string"
              ? await client.channels.fetch(targetChannelId).catch((error) => {
                  console.error("Error fetching channel:", error.message);
                  return null;
                })
              : targetChannelId;

          if (targetChannel) {
            console.log(
              `Sending notification to channel ${targetChannel.name}`
            );
            targetChannel.send(
              `New video for ${channelIdYoutube}: https://www.youtube.com/watch?v=${latestVideoId}`
            );

            // Add the posted video ID to the database
            await savePostedVideoId(latestVideoId);
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
  } catch (error) {
    console.error("Error in checkYouTubeChannels:", error.message);
    throw error;
  }
}

module.exports = {
  getLatestVideoId,
  checkYouTubeChannels,
};
