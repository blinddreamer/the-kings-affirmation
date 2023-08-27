// smart.js
const OpenAI = require("openai-api");

const OPENAI_API_KEY = process.env.SMART_KEY;

const openai = new OpenAI({ key: OPENAI_API_KEY });

async function answerQuestion(question) {
  try {
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: question,
      maxTokens: 250,
      // Additional parameters can be added here as needed
    });

    return gptResponse.choices[0].text;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    throw error;
  }
}

module.exports = {
  answerQuestion,
};
