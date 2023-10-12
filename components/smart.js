// smart.js
const { sendLongMessage } = require("./LongMessage");
const { ChatCompletionCreateParams, ChatCompletion } = require("openai"); // Import required OpenAI modules
const { Client } = require("discord.js");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function answerQuestion(question) {
  try {
    const params: ChatCompletionCreateParams = {
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    };

    const gptResponse: ChatCompletion = await openai.chat.completions.create(
      params
    );

    return (
      gptResponse.choices[0]?.message?.content.trim() ||
      "No response from OpenAI"
    );
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    throw error;
  }
}

async function handleMessage(message, client) {
  console.log("Message received:", message.content);

  if (message.mentions.has(client.user)) {
    // Check if the message mentions the bot
    try {
      const answer = await answerQuestion(message.content);

      if (answer.length <= 2000) {
        message.reply(answer);
      } else {
        sendLongMessage(message.channel, answer);
      }

      console.log(
        `Replied to message by ${message.author.tag}: "${message.content}"`
      );
    } catch (error) {
      console.error("Error fetching answer:", error);
      message.reply("ME NOT THAT SMART.");
    }
  }
}

module.exports = {
  handleMessage,
};
