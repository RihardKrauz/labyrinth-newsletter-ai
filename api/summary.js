const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_TOKEN = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promtGetSummary = 'Я предоставлю тебе сообщения из переписки нескольких пользователей в формате: "Пользователь {username} сказал: {message} \n". Тебе нужно будет выделить 1-3 основные темы, которые обсуждали пользователи, и кратко изложить суть диалога в 1-2 предложениях по каждой теме. Формат ответа может выглядеть так: "[emoji-of-fish] Рыбалка. Пользователь username1 пригласил username2 и username3 на рыбалку, но они отказались. \n [emoji-of-earth] Компьютерные игры. Username1 обсуждал с username2 стратегии игры в Civilization 5 \n (и так далее)". \n Вот сама переписка, используй эти сообщения: ';
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins (you can change '*' to specific origins)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');  // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers

    const body = req.body;
    const prompt = promtGetSummary + (body?.messages || 'Нет сообщений.');
    const result = await model.generateContent(prompt);
    res.status(200).json({ message: result.response.text() });
}
