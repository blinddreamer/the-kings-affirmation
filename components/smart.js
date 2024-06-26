// smart.js
const { sendLongMessage } = require("./LongMessage");
const { OpenAI } = require("openai"); // Updated import to use destructuring

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY); // Updated initialization without passing an object

async function answerQuestion(question) {
  try {
    const params = {
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    };

    const gptResponse = await openai.chat.completions.create(params);

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
