// smart.js
const { sendLongMessage } = require("./LongMessage");
const tectalicOpenai = require("@tectalic/openai").default;
const { Client } = require("discord.js"); // Import the Discord Client

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = tectalicOpenai(OPENAI_API_KEY);

async function answerQuestion(question) {
  try {
    const gptResponse = await openai.chatCompletions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    return gptResponse.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    throw error;
  }
}

async function handleMessage(message, client) {
  console.log("Message received:", message.content);

  // Check if the message mentions the bot
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)) {
    try {
      const answer = await answerQuestion(message.content);

      if (answer.length <= 2000) {
        message.reply(answer);
      } else {
        sendLongMessage(message.channel, answer);
      }

      console.log(`Replied to message by ${message.author.tag}: "${message.content}"`);
    } catch (error) {
      console.error("Error fetching answer:", error);
      message.reply("ME NOT THAT SMART.");
    }
  }
}

module.exports = {
  handleMessage,
};
