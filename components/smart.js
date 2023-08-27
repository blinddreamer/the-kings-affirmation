// smart.js

const tectalicOpenai = require("@tectalic/openai").default;

let openaiClient; // Initialize as null

function initializeOpenAI(apiKey) {
  openaiClient = tectalicOpenai(apiKey);
}

async function answerQuestion(question) {
  if (!openaiClient) {
    throw new Error("OpenAI client is not initialized.");
  }

  try {
    const gptResponse = await openaiClient.chatCompletions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    return gptResponse.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    throw error;
  }
}

module.exports = {
  initializeOpenAI,
  answerQuestion,
};
