import express from "express";
import asyncHandler from "express-async-handler";
import Review from "./reviewModel";
import authenticate from "../../authenticate";

const router = express.Router();

//Post a review 
router.post("/", authenticate, asyncHandler(async (req, res) => {
    const { movieId, content, rating } = req.body;

    const review = await Review.create({
        movieId,
        content,
        rating,
        author: req.user.username
    });
    res.status(201).json(review);
}));

//Get reviews for a movie
router.get("/movie/:id", asyncHandler(async (req, res) => {
    const reviews = await Review.find({ movieId: req.params.id });
    res.status(200).json(reviews);
}));

// Get reviews by a user
router.get("/user/:username", asyncHandler( async (req, res) => {
    const reviews = await Review.find({ author: req.params.username });
    res.status(200).json(reviews);
}));

export default router;