// smart.js
const axios = require("axios");

async function answerQuestion(mentionedContent) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        prompt: mentionedContent,
        max_tokens: 250,
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
