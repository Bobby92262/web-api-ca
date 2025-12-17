import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
    getMovies,
    getMovie,
    getUpcomingMovies,
    getGenres,
    getMovieImages,
    getMoviesCredits,
    getSimilarMovies,
    getTrendingMovies,
    getTopRatedMovies,
    getPersonDetails,
    getPersonImages
 } from '../tmdb-api'; 


const router = express.Router();

// movie routes to be added

//Get Discover movies (all)
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

// Get single movie
router.get('/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

// Upcoming
router.get('/upcoming/list', asyncHandler(async (req, res) => {
    const movies = await getUpcomingMovies();
    res.status(200).json(movies);
}));

// Genres
router.get('/genres/list', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

// Moive Images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

// Credits
router.get('/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getMoviesCredits(req.params.id);
    res.status(200).json(credits);
}));

//Similar
router.get('/:id/similar', asyncHandler(async (req, res) => {
    const movies = await getSimilarMovies(req.params.id);
    res.status(200).json(movies);
}));

// Trending
router.get('/trending/week', asyncHandler(async (req, res) => {
    const movies = await getTrendingMovies();
    res.status(200).json(movies);
}));

// Top rated
router.get('/toprated/list', asyncHandler(async (req, res) => {
    const movies = await getTopRatedMovies();
    res.status(200).json(movies);
}));

// Person Details
router.get('/person/:id', asyncHandler(async (req, res) => {
    const person = await getPersonDetails(req.params.id);
    res.status(200).json(person);
}));

// Get Person Images
router.get('/person/:id/images', asyncHandler(async (req, res) => {
    const images = await getPersonImages(req.params.id);
    res.status(200).json(images);
}));

export default router;
