const movieModel = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
    const movies = await movieModel.getAll();
    res.status(200).json(movies);
};

exports.getMovieById = async (req, res) => {
    const movie = await movieModel.getById(req.params.movieId);
    if (movie) {
        res.status(200).send(movie);
    } else {
        res.status(404).send('Movie not found');
    }
};

exports.addMovie = async (req, res) => {
    try {
        const newMovie = await movieModel.create(req.body);
        res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.updateMovie = async (req, res) => {
    const updatedMovie = await movieModel.update(req.params.movieId, req.body);
    if (updatedMovie) {
        res.status(200).json(updatedMovie);
    } else {
        res.status(404).send('Movie not found');
    }
};

exports.deleteMovie = async (req, res) => {
    const success = await movieModel.delete(req.params.movieId);
    if (success) {
        res.send('Movie deleted successfully');
    } else {
        res.status(404).send('Movie not found');
    }
};
