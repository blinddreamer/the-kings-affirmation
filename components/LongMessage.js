// LongMessage.js

async function sendLongMessage(channel, longText) {
  const MAX_MESSAGE_LENGTH = 2000; // Discord's character limit for a single message (2000)

  const numChunks = Math.ceil(longText.length / MAX_MESSAGE_LENGTH);

  for (let i = 0; i < numChunks; i++) {
    const start = i * MAX_MESSAGE_LENGTH;
    const end = start + MAX_MESSAGE_LENGTH;
    const chunk = longText.slice(start, end);

    // Send each chunk as a separate message
    await channel.send(chunk);
  }
}

module.exports = {
  sendLongMessage,
};
