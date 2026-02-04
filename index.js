const express = require('express');
const {connect} = require('./utils/db')

const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');
connect();

const PORT = 3000;
const server = express();



// Para poder usar req.body en POST y PUT
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Montamos las rutas
server.use('/movies', movieRoutes);
server.use('/cinemas', cinemaRoutes);

server.listen(PORT, () => {
  console.log(`Server running in <http://localhost>:${PORT}`);
});