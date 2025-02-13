require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
);


const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'users', timestamps: false });


const Movie = sequelize.define('Movie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    releaseYear: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'movies', timestamps: false });


const Genre = sequelize.define('Genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, unique: true, allowNull: false }
}, { tableName: 'genres', timestamps: false });


const SavedMovies = sequelize.define('SavedMovies', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    MovieId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'saved_movies', timestamps: false });



const MovieGenre = sequelize.define('MovieGenre', {}, { tableName: 'movie_genres', timestamps: false });


User.belongsToMany(Movie, {
    through: SavedMovies,
    foreignKey: 'UserId',
    otherKey: 'MovieId',
    as: 'savedMovies'
});

Movie.belongsToMany(User, {
    through: SavedMovies,
    foreignKey: 'MovieId',
    otherKey: 'UserId',
    as: 'savedByUsers'
});



Movie.belongsToMany(Genre, {
    through: MovieGenre,
    foreignKey: 'movie_id',
    otherKey: 'genre_id',
    as: 'genres'
});
Genre.belongsToMany(Movie, {
    through: MovieGenre,
    foreignKey: 'genre_id',
    otherKey: 'movie_id',
    as: 'movies'
});

sequelize.sync({ alter: true })
    .then(() => console.log('📌 Banco de dados sincronizado com PostgreSQL'))
    .catch(error => console.error('Erro ao sincronizar:', error));

module.exports = { sequelize, User, Movie, Genre, SavedMovies, MovieGenre };
