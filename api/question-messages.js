const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_TOKEN = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promtAnalyzeMessages = 'Я предоставлю тебе сообщения из переписки нескольких пользователей в формате: "{username}: {message} \n". В самом конце я задам вопрос, ответ на который может находиться только в этой переписке. Вот сама переписка, используй эти сообщения: ';
const promtCustomQuestion = 'Мой вопрос: ';
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (you can change '*' to specific origins)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers

    const body = req.body;
    const prompt = promtAnalyzeMessages + (body?.messages || 'Нет сообщений.') + promtCustomQuestion + (body?.question || 'Нет вопроса.');
    const result = await model.generateContent(prompt);
    res.status(200).json({ message: result.response.text() });
}
