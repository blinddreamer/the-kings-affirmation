const axios = require("axios");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

async function answerQuestion(question) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: question,
        max_tokens: 250, //number of tokens
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SMART_KEY}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    throw error;
  }
}

module.exports = {
  answerQuestion,
};
