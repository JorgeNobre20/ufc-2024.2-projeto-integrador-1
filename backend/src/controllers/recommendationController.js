const { User, Movie, SavedMovies, Genre} = require('../config/database');
const { getMovieRecommendations, getMoviesByGenre} = require('../services/gemini');
const {Op} = require("sequelize");

exports.getRecommendedMovies = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: {
                model: Movie,
                through: { attributes: [] }
            }
        });

        if (!user || user.Movies.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado ou sem filmes salvos." });
        }


        const savedMovieTitles = user.Movies.map(movie => movie.title);


        const recommendedTitles = await getMovieRecommendations(savedMovieTitles);

        if (recommendedTitles.length === 0) {
            return res.status(500).json({ error: "Não foi possível obter recomendações." });
        }
        console.log(recommendedTitles)

        const existingMovies = await Movie.findAll({
            where: { title: recommendedTitles },
            include: {
                model: Genre,
                as: 'genres',
                through: { attributes: [] }
            }
        });


        res.json({ recommendedMovies: existingMovies });
    } catch (error) {
        console.error("Erro ao gerar recomendações:", error);
        res.status(500).json({ error: "Erro ao obter recomendações." });
    }
};

exports.getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;

        const movieTitles = await getMoviesByGenre(genre);

        console.log(movieTitles)

        if (movieTitles.length === 0) {
            return res.status(404).json({ error: "Nenhum filme encontrado para este gênero." });
        }

        const moviesInDatabase = await Movie.findAll({
            where: {
                title: movieTitles
            },
            include: {
                model: Genre,
                as: 'genres',
                through: { attributes: [] },
                where: {
                    name: { [Op.in]: [genre] }
                }
            }
        });
        if (moviesInDatabase.length === 0) {
            return res.status(404).json({ error: "Nenhum dos filmes recomendados foi encontrado na base de dados." });
        }

        res.json({ movies: moviesInDatabase });
    } catch (error) {
        console.error("Erro ao obter filmes por gênero:", error);
        res.status(500).json({ error: "Erro ao buscar filmes." });
    }
};