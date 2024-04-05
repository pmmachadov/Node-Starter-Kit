const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

// Asegúrate de que la ruta a moviesData.json sea correcta según tu estructura de archivos.
let movies = require('../moviesData.json');

const movieSchema = Joi.object({
    title: Joi.string().min(1).required(),
    director: Joi.string().min(1).required(),
    yearOfRelease: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    certificate: Joi.string().required()
});


const persistMoviesData = async (movies) => {
    await fs.writeFile('./moviesData.json', JSON.stringify(movies, null, 2));
};

exports.getAll = async () => {
    return movies;
};

exports.getById = async (movieId) => {
    return movies.find(movie => movie.id.toString() === movieId);
};

exports.create = async (movieData) => {
    const { value, error } = movieSchema.validate(movieData);
    if (error) throw new Error(error.details[0].message);

    const newMovie = { id: uuidv4(), ...value };
    movies.push(newMovie);
    await persistMoviesData(movies);
    return newMovie;
};

exports.update = async (movieId, updateData) => {
    const index = movies.findIndex(movie => movie.id.toString() === movieId);
    if (index === -1) return null;

    const { value, error } = movieSchema.validate(updateData);
    if (error) throw new Error(error.details[0].message);

    movies[index] = { ...movies[index], ...value };
    await persistMoviesData(movies);
    return movies[index];
};

exports.delete = async (movieId) => {
    const lengthBefore = movies.length;
    movies = movies.filter(movie => movie.id.toString() !== movieId);
    if (movies.length === lengthBefore) return false;

    await persistMoviesData(movies);
    return true;
};
