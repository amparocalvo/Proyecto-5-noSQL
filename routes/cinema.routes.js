const express =require('express');
const  Cinema = require('../models/Cinema');


const router = express.Router();
// get/ cinemas (todos los cines con las peliculas)
router.get('/', async (req, res) => {
    try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
    } catch (err) {
    return res.status(500).json(err);
    }
});

// get /cinemas/id/:id  (un cine por id con películas)

router.get('/id/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const cinema = await Cinema.findById(id).populate('movies');

    if (!cinema) {
        return res.status(404).json('No cinema found by this id');
    }

    return res.status(200).json(cinema);
    } catch (err) {
    return res.status(500).json(err);
    }
});

// post /cinemas/create (crear cine)

router.post('/create', async (req, res) => {
    try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
    } catch (err) {
    return res.status(500).json(err);
    }
});

// put /cinemas/edit/:id (editar datos del cine)

router.put('/edit/:id', async (req, res) => {
    try {
    const { id } = req.params;

    const cinemaModify = new Cinema(req.body);
    cinemaModify._id = id;

    const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaModify, {
        new: true,
    });

    return res.status(200).json(cinemaUpdated);
    } catch (err) {
    return res.status(500).json(err);
    }
});

// PUT /cinemas/add-movie/:id  (añadir una película al cine)

router.put('/add-movie/:id', async (req, res) => {
    try {
    const { id } = req.params; // cinemaId
    const { movieId } = req.body;

    const updatedCinema = await Cinema.findByIdAndUpdate(
        id,
        { $push: { movies: movieId } },
        { new: true }
    ).populate('movies');

    return res.status(200).json(updatedCinema);
    } catch (err) {
    return res.status(500).json(err);
    }
});

// delete /cinemas/:id -> borrar cine
router.delete('/:id', async (req, res) => {
    try {
    const { id } = req.params;

    await Cinema.findByIdAndDelete(id);
    return res.status(200).json('Cinema deleted!'); 
    }catch (err) {
    return res.status(500).json(err);
    }
});

module.exports = router;
