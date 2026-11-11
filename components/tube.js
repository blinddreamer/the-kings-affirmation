// tube.js
const axios = require("axios");
const mysql = require("mysql2/promise");

const channelIds = [
  "UCwjD8oI3cPSMBzQ0DT6qD_Q", // Bombeldo
  "UCmsL9Rk7HgVEIYj-pzTmSWg", // new eden post
  "UCwF3VyalTHzL0L-GDlwtbRw", // CCP
  "UCCHhZnVFfQJ1NP1p1Y6uZRQ", // OZ
  "UC82eZ4W2tp7N8TRr2KMSrpA", // crashnaps
  "UC7rx1i0VMqBVBtHBemFUaIA", // Kaiser Friedlich
];

// Videos older than this are ignored, so a fresh DB doesn't flood the channel.
// Must be longer than the check interval.
const LOOKBACK_MS = 2 * 24 * 60 * 60 * 1000;

// Lazy: connects on first query, reconnects on its own.
const pool = mysql.createPool({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: "discord_bot_db",
});

// Recent uploads as [{ id, channelTitle }], oldest first.
// ponytail: search costs 100 quota units/call (~700/day of 10k); uploads playlist is 1 unit if quota gets tight
async function getRecentVideos(channelIdYoutube) {
  const { data } = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        channelId: channelIdYoutube,
        type: "video",
        order: "date",
        maxResults: 5,
        publishedAfter: new Date(Date.now() - LOOKBACK_MS).toISOString(),
        key: process.env.YT_API,
      },
    }
  );
  return data.items
    .map((item) => ({
      id: item.id.videoId,
      channelTitle: item.snippet.channelTitle,
    }))
    .reverse();
}

// Never rejects: errors are logged so a bad run can't crash the bot.
async function checkYouTubeChannels(client, targetChannelId) {
  try {
    const [rows] = await pool.query("SELECT video_id FROM posted_videos");
    const posted = new Set(rows.map((row) => row.video_id));
    const target = await client.channels.fetch(targetChannelId);

    for (const channelIdYoutube of channelIds) {
      try {
        for (const video of await getRecentVideos(channelIdYoutube)) {
          if (posted.has(video.id)) continue;
          await target.send(
            `New video from ${video.channelTitle}: https://www.youtube.com/watch?v=${video.id}`
          );
          // Saved only after a successful send, so failed posts retry next run.
          await pool.query("INSERT INTO posted_videos (video_id) VALUES (?)", [
            video.id,
          ]);
          posted.add(video.id);
        }
      } catch (error) {
        console.error(`Error checking ${channelIdYoutube}:`, error.message);
      }
    }
  } catch (error) {
    console.error("YouTube check failed:", error.message);
  }
}

module.exports = { checkYouTubeChannels };
