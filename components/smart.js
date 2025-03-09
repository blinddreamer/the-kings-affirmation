const { sendLongMessage } = require("./LongMessage");
const axios = require("axios"); // Using axios for HTTP requests

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL; // Ollama API

async function answerQuestion(question) {
  try {
    const params = {
      model: "deepseek-r1:1.5b", // Ensure this matches your installed model name in Ollama
      prompt: question,
      stream: false,
    };

    const response = await axios.post(DEEPSEEK_API_URL, params, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data.response?.trim() || "No response from DeepSeek";
  } catch (error) {
    console.error("Error fetching response from DeepSeek:", error.message);
    throw error;
  }
}

async function handleMessage(message, client) {
  console.log("Message received:", message.content);

  if (message.mentions.has(client.user)) {
    try {
      const answer = await answerQuestion(message.content);

      if (answer.length <= 2000) {
        message.reply(answer);
      } else {
        sendLongMessage(message.channel, answer);
      }

      console.log(
        `Replied to the message by ${message.author.tag}: "${message.content}"`
      );
    } catch (error) {
      console.error("Error fetching an answer:", error);
      message.reply("ME NOT THAT SMART.");
    }
  }
}

module.exports = {
  handleMessage,
};
