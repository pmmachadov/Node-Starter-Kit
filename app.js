require('dotenv').config();
const express = require('express');
const moviesRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/movies', moviesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
