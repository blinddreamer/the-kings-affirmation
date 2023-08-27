const tectalicOpenai = require("@tectalic/openai").default;

// Load your OpenAI API key from an environment variable
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your environment variable

// Create an OpenAI client
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

module.exports = {
  answerQuestion,
};
