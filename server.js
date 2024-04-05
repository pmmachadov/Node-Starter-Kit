// const express = require('express');
// const fs = require('fs');
// const Joi = require('joi');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const PORT = 3000;
// let movies = require('./moviesData.json'); // Use let for reassignment

// app.use(express.json());

// // Helper function to persist data
// const persistMoviesData = (movies) => {
//     fs.writeFile('./moviesData.json', JSON.stringify(movies, null, 2), (err) => {
//         if (err) throw err;
//     });
// };

// // Validation schema for movies
// const movieSchema = Joi.object({
//     title: Joi.string().min(1).required(),
//     director: Joi.string().min(1).required(),
//     // Add more fields as necessary
// });

// // GET all movies
// app.get('/movies', (req, res) => {
//     res.status(200).json(movies);
// });

// // GET a single movie by ID
// app.get('/movies/:movieId', (req, res) => {
//     const movie = movies.find((movie) => movie.id === req.params.movieId);

//     if (movie) {
//         res.send(movie);
//     } else {
//         res.status(404).send('Movie not found');
//     }
// });

// // POST a new movie
// app.post("/movies", async (req, res, next) => {
//     try {
//         // Validation
//         await movieSchema.validateAsync(req.body);

//         const newMovieId = uuidv4(); // Generate a new UUID
//         const newMovie = { id: newMovieId, ...req.body };

//         movies.push(newMovie);
//         persistMoviesData(movies); // Persist data
//         res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
//     } catch (err) {
//         next(err); // Error handling
//     }
// });

// // PUT to update a movie
// app.put('/movies/:movieId', async (req, res, next) => {
//     try {
//         await movieSchema.validateAsync(req.body);
//         const { id, ...updateData } = req.body;
//         const movieIndex = movies.findIndex(movie => movie.id === req.params.movieId);

//         if (movieIndex > -1) {
//             const oldMovie = movies[movieIndex];
//             const updatedMovie = { ...oldMovie, ...updateData };
//             movies[movieIndex] = updatedMovie;
//             persistMoviesData(movies); // Persist data

//             res.json({ old: oldMovie, updated: updatedMovie });
//         } else {
//             res.status(404).send('Movie not found');
//         }
//     } catch (err) {
//         next(err); // Error handling
//     }
// });

// // DELETE a movie
// app.delete('/movies/:movieId', (req, res) => {
//     const movieIndex = movies.findIndex((movie) => movie.id === req.params.movieId);

//     if (movieIndex > -1) {
//         movies = movies.filter(movie => movie.id !== req.params.movieId);
//         persistMoviesData(movies); // Persist data
//         res.send('Movie deleted successfully');
//     } else {
//         res.status(404).send('Movie not found');
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
