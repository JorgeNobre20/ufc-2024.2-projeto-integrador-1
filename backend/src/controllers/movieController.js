const {SavedMovies, Movie, Genre, User} = require("../config/database");


exports.saveMovie = async (req, res) => {
    try {
        const { userId } = req.params;
        const { movieId } = req.body;

        await SavedMovies.create({UserId: userId, MovieId: movieId})


        res.json({ message: 'Salvo com sucesso!' });
    } catch (error) {
        console.error("Erro ao salvar filme:", error);
        res.status(500).json({ error: "Erro ao salvar filme:" });
    }
};

exports.getSavedMovie = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: {
                model: Movie,
                as: 'savedMovies',
                through: { attributes: [] }
            }
        });


        res.json({ savedMovies: user?.savedMovies ?? [] });
    } catch (error) {
        console.error("Erro ao listar filmes", error);
        res.status(500).json({ error: "Erro ao listar filmes" });
    }
};

exports.getAvailableGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll({});
        res.json({ genres });
    } catch (error) {
        console.error("Erro ao obter gêneros", error);
        res.status(500).json({ error: "Erro ao obter gêneros" });
    }
}