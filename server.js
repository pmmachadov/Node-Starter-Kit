const express = require('express');
const app = express();
const PORT = 3000;
const movies = require('./moviesData.json');

app.use(express.json());

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:movieId', (req, res) => {
    const movieId = parseInt(req.params.movieId, 10);
    const movie = movies.find((movie) => movie.id === movieId);
    console.log(`movieId: ${movieId}`);

    if (movie) {
        res.send(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

app.post("/movies", (req, res) => {
    const newMovie = req.body;
    const newMovieId = parseInt(newMovie.id, 10);
    const movieExists = movies.some(movie => movie.id === newMovieId);
    if (movieExists) {
        res.status(409).send("A movie with the same ID already exists.");
    } else {
        newMovie.id = newMovieId;
        movies.push(newMovie);
        res.status(201).send("Movie added successfully!");
    }
});


app.delete('/movies/:movieId', (req, res) => {
    const movieId = parseInt(req.params.movieId, 10);
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex > -1) {
        movies.splice(movieIndex, 1);
        res.send('Movie deleted successfully');
    } else {
        res.status(404).send('Movie not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
