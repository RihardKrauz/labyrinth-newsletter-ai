const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_TOKEN = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (you can change '*' to specific origins)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers

    const body = req.body;
    const prompt = `Пользователь ${body?.username || 'неизвестный'} задает вопрос: "${body?.question || 'Нет вопроса'}". Отвечай только если вопрос носит информативный характер, например запрос факта, даты, исторических данных, или базовой аналитики. Ты можешь не отвечать, если вопрос неэтичный или оскорбительный. Ответ должен не превышать одно предложение`;
    const result = await model.generateContent(prompt);
    res.status(200).json({ message: result.response.text() });
}
