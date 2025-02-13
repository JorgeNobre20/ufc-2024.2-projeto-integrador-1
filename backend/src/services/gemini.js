const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const getMovieRecommendations = async (movies) => {
    try {
        const prompt = `Eu gostei desses filmes: ${movies.join(", ")}. Com base nisso, me recomende 20 outros filmes que eu possa gostar. Responda apenas com os nomes dos filmes, separados por vírgula.`;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        console.log("response: " , response);
        return response.split(",").map(movie => movie.trim());
    } catch (error) {
        console.error("Erro ao obter recomendações do Gemini:", error);
        return [];
    }
};

const getMoviesByGenre = async (genre) => {
    try {
        const prompt = `Me recomende 20 filmes do gênero "${genre}" com base nas melhores notas e críticas. Responda apenas com o título de cada filme, separados por vírgula.`;

        console.log(prompt);

        const result = await model.generateContent(prompt);

        console.log(result);

        const response = await result.response.text();

        console.log("response: " , response);

        return response.split(",").map(movie => movie.trim());
    } catch (error) {
        console.error("Erro ao obter filmes do Gemini:", error);
        return [];
    }
};

module.exports = { getMovieRecommendations, getMoviesByGenre };
