const tectalicOpenai = require("@tectalic/openai").default;

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

module.exports = {
  answerQuestion,
};
